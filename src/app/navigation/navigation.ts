import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
	{
		id			: 'pages',
		title		: 'Pages',
		translate	: 'NAV.PAGES',
		type		: 'group',
		children 	: [
			{
				id	   		: 'profile',
				title		: 'Profile',
				translate	: 'NAV.PROFILE.TITLE',
				type	 	: 'item',
				icon	 	: 'person',
				url	  		: '/profile',
			},
			{
				id	   		: 'chat',
				title		: 'Chat',
				translate	: 'NAV.CHAT.TITLE',
				type	 	: 'item',
				icon	 	: 'mail_outline',
				url	  		: '/chat',
				badge	: {
					title		: '25',
					bg	   		: '#F44336',
					fg	   		: '#FFFFFF'
				}
			}
		]
	},
	{
		id			: 'applications',
		title		: 'Applications',
		translate	: 'NAV.APPLICATIONS',
		type		: 'group',
		children 	: [
			{
				id	   		: 'documents',
				title		: 'Documents',
				translate	: 'NAV.DOCUMENTS.TITLE',
				type	 	: 'item',
				icon	 	: 'assignment',
				url	  		: '/documents',
			},
			{
				id	   		: 'workspaces',
				title		: 'Workspaces',
				translate	: 'NAV.WORKSPACES.TITLE',
				type	 	: 'item',
				icon	 	: 'folder',
				url	  		: '/workspaces',
			},
			{
				id	   		: 'datasets',
				title		: 'Datasets',
				translate	: 'NAV.DATASETS.TITLE',
				type	 	: 'item',
				icon	 	: 'settings',
				url	  		: '/datasets',
			},
			{
				id	   		: 'parttrees',
				title		: 'Part Trees',
				translate	: 'NAV.PARTTREES.TITLE',
				type	 	: 'item',
				icon	 	: 'sort',
				url	  		: '/parttrees',
			}
		]
	},
	{
		id			: 'utilities',
		title		: 'Utilities',
		translate	: 'NAV.UTILITIES',
		type		: 'group',
		children 	: [
			{
				id	   		: 'constants',
				title		: 'Constants',
				translate	: 'NAV.CONSTANTS.TITLE',
				type	 	: 'item',
				icon	 	: 'person',
				url	  		: '/constants',
			},
			{
				id	   		: 'units',
				title		: 'Units',
				translate	: 'NAV.UNITS.TITLE',
				type	 	: 'item',
				icon	 	: 'straighten',
				url	  		: '/units'
			}
		]
	},
];
