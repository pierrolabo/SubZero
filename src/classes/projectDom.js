class ProjectDOM extends HTMLDivElement {
	constructor() {
		super();
	}

	static get observedAttributes() {
		return ['name', 'color']
	}

	get name() {
		return this.getAttribute('name')
	}

	get color() {
		return this.getAttribute('color')
	}

	set name(name) {
		this.setAttribute('name', name)
	}

	set color(color) {
		this.setAttribute('color', color)
	}

	connectedCallback() {
		let shadow = this.attachShadow({mode:'open'});
		this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
		this.style.borderRadius = '5px';
		this.style.width = '40%';
		this.style.display = 'block'
		this.style.backgroundColor = "#1e1e1e"
		this.style.color = 'var(--main-text-color)'

		let container = document.createElement('div');
		container.style.padding = '2px 16px'

		let name =  document.createElement('h1');

		let settings = document.createElement('button');
		settings.style.backgroundColor = 'var(--main-color)';
		settings.style.border = 'none';
		settings.innerHTML = "SETTING";
		settings.style.color = this.color;
		settings.style.display = 'inline-block';


		let open = document.createElement('button');
		open.style.backgroundColor = 'white';
		open.style.border = 'none';
		open.innerHTML = "OPEN";
		open.style.color = this.color;

		open.addEventListener('click', _ => {
			window.api.openproject(this.name);
		})

		settings.addEventListener('click', _ => {
			window.api.updateproject(this.name);
		})

		this.addEventListener('mouseover', _ => {
			this.style.boxShadow = '0 8px 16px 0 rgba(0,0,0,0.2)';
		})
		this.addEventListener('mouseout', _ => {
			this.style.boxShadow = '0 4px 8px 0 rgba(0,0,0,0.2)';
		})

		name.innerHTML = `${this.name}`;

		container.appendChild(name);
		container.appendChild(settings);
		container.appendChild(open);
		shadow.appendChild(container);
	}
}


customElements.define('sub-card', ProjectDOM, {extends: "div"});