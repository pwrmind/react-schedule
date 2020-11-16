import React, { Component } from 'react';
import { IResource } from 'api/data/resources';

import './ResourceAppointment.scss';

interface IResourceAppointmentProps {
	resources: IResource[];
	onSetResource: Function;
}

export default class ResourceAppointment extends Component<IResourceAppointmentProps> {
	static defaultProps: IResourceAppointmentProps = {
		resources: [],
		onSetResource: Function.prototype
	};
	
	public state = {
		activeFilter: 0,
		headerOpened: false,
		searchOpened: false,
		selectedResources: [],
		resources: [],
		searchResources: []
	};

	public selectedCheckboxes: Set<IResource> = new Set();

	public itemRefs: any = {};

	public componentDidUpdate(prevProps: IResourceAppointmentProps) {
		if (prevProps.resources !== this.props.resources) {
			this.setState({
				resources: this.props.resources,
				searchResources: this.props.resources
			})
		}
	}

	public searchResource = (e: any) => {
		const search: string = e.target.value.toLowerCase();

		if (search === '') {
			this.setState({
				searchResources: this.state.resources
			});
		}

		if (search.length >= 3) {
			const searchResources = this.state.resources.filter(
				(resource: IResource) => {
					return resource.name.toLowerCase().includes(search) ||
						resource.specialty.toLowerCase().includes(search);
				}
			);

			this.openSearch();
			this.setState({
				searchResources
			});
		} else {
			this.closeSearch();
		}
	};

	public toggleHeaderPopup = () => {
		this.setState({
			headerOpened: !this.state.headerOpened
		});

		this.closeSearch();
	};

	public toggleSearch = () => {
		this.setState({
			searchOpened: !this.state.searchOpened
		})
	};

	public openSearch = () => {
		this.setState({
			searchOpened: true
		})
	};

	public closeSearch = () => {
		this.setState({
			searchOpened: false
		})
	};

	public scrollToResource(resource: IResource): void {
		this.itemRefs[resource.id].scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}

	public selectResource = (resource: IResource) => {
		if (!this.selectedCheckboxes.has(resource)) {
			this.setResource(resource);
		}

		this.toggleSearch();
		this.scrollToResource(resource);
	};

	public setFilter = (activeFilter: number) => {
		this.setState({activeFilter});
	};

	public isCheckedGroupResource(resources: IResource[]): boolean {
		for (const resource of resources) {
			if (!this.selectedCheckboxes.has(resource)) {
				return false;
			}
		}

		return true;
	};

	public checkResource(resource: IResource): void {
		if (this.selectedCheckboxes.has(resource)) {
			this.selectedCheckboxes.delete(resource);
		} else {
			this.selectedCheckboxes.add(resource);
		}
	};

	public checkGroupResource(resources: IResource[]): void {
		if (this.isCheckedGroupResource(resources)) {
			for (const key in resources) {
				this.selectedCheckboxes.delete(resources[key]);
			}
		} else {
			for (const key in resources) {
				this.selectedCheckboxes.add(resources[key]);
			}
		}
	};

	public setSelectedResources = () => {
		const selectedResources = Array.from(this.selectedCheckboxes);
		this.setState({selectedResources});
		this.props.onSetResource(selectedResources);
	};

	public setResource = (resource: any) => {
		if (resource.data === undefined) {
			this.checkResource(resource);
		} else {
			this.checkGroupResource(resource.data);
		}

		this.setSelectedResources();
	};

	public setAllChecks = (resources: IResource[]) => {
		this.setResource({data: resources});
		this.toggleHeaderPopup();
	};

	public resetAllChecks = () => {
		this.selectedCheckboxes.clear();

		this.setSelectedResources();
		this.toggleHeaderPopup();
	};

	public resourcesConstructor = () => {
		const resources: any = this.state.resources;
		if (this.state.activeFilter === 1) {
			return resources;
		}

		const outData: any[] = [],
			tmpData: any = {};

		for (const key in resources) {
			const resource = resources[key];
			if (tmpData[resource.specialty] === undefined) {
				tmpData[resource.specialty] = {name: resource.specialty, data: []}
			}

			tmpData[resource.specialty].data.push(resource);
		}

		for (const key in tmpData) {
			outData.push(tmpData[key]);
		}

		return outData;
	};

	public makeSearch = () => {
		const resources: any = this.resourcesConstructor();

		if (this.state.activeFilter === 0) {
			return resources.map((specialty: any, index: any) =>
				<li
					key={index}
				>
					<label>
						<input
							type="checkbox"
							checked={this.isCheckedGroupResource(specialty.data)}
							onChange={() => this.setResource(specialty)}
						/>
						{specialty.name}
					</label>

					<ul>
						{specialty.data.map((resource: any, index: any) =>
							<li
								key={index}
								ref={el => (this.itemRefs[resource.id] = el)}
							>
								<label>
									<input
										type="checkbox"
										checked={this.selectedCheckboxes.has(resource)}
										onChange={() => this.setResource(resource)}
									/>
									{resource.name}
								</label>
							</li>
						)}
					</ul>
				</li>
			)
		}

		if (this.state.activeFilter === 1) {
			return resources.map((resource: IResource, index: any) =>
				<li
					key={index}
					className="normal"
					ref={el => (this.itemRefs[resource.id] = el)}
				>
					<label>
						<input
							type="checkbox"
							checked={this.selectedCheckboxes.has(resource)}
							onChange={() => this.setResource(resource)}
						/>
						{resource.name} ({resource.specialty})
					</label>
				</li>
			)
		}
	};

	render() {
		return (
			<div className="resource-appointment__root">
				<div className="resource-appointment__header">
					<h1 className="resource-appointment__header-text">Специалисты <span>({this.state.selectedResources.length}/{this.state.resources.length})</span></h1>
					<button className={"resource-appointment__header-button" + (this.state.headerOpened ? ' active' : '')} onClick={this.toggleHeaderPopup}>▼</button>

					<div className={"resource-appointment__header-popup" + (this.state.headerOpened ? '' : ' closed')}>
						<p onClick={() => this.setAllChecks(this.state.resources)}>Выбрать все</p>
						<p onClick={this.resetAllChecks}>Отменить все выбранные</p>
					</div>
				</div>

				<div className="resource-appointment__body">
					<input className="resource-appointment__body-input" placeholder="Введите текст для поиска" onChange={this.searchResource}/>
					<button className="resource-appointment__body-button" onClick={this.toggleSearch}></button>

					<div className={"resource-appointment__search" + (this.state.searchOpened ? '' : ' closed')}>
						<div className="resource-appointment__search-list">
							{this.state.searchResources.map((resource: any) => (
								<div
									key={resource.id}
									className="resource-appointment__search-list_resource"
									onClick={() => {this.selectResource(resource)}}
								>
									<p>{resource.name}</p>
								</div>
							))}

							{this.state.searchResources.length ? null : (
								<div className="resource-appointment__search-list_noresource">
									Совпадений не найдено
								</div>
							)}
						</div>
					</div>
				</div>

				<div className="resource-appointment__footer">
					<div className="resource-appointment__footer__buttons-wrapper">
						<button
							disabled={this.state.activeFilter === 0}
							onClick={() => this.setFilter(0)}
							className={`resource-appointment__footer-button`}
						>
							По специальностям
						</button>

						<button
							disabled={this.state.activeFilter === 1}
							onClick={() => this.setFilter(1)}
							className={`resource-appointment__footer-button`}
						>
							По алфавиту
						</button>
					</div>

					<div className="resource-appointment__footer__search-wrapper">
						<ul>
							{this.makeSearch()}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
