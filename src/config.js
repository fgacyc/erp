export const hostURL =
	import.meta.env['MODE'] === 'development'
		? import.meta.env['VITE_CLOUD_HOST_URL']
		: import.meta.env['VITE_PROD_HOST_URL'];
