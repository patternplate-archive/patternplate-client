export default function getFolder(navigation, id) {
	return id.split('/')
		.filter(Boolean)
		.reduce((registry, fragment) => {
			if (!registry) {
				return registry;
			}

			const item = registry.children ? registry.children[fragment] : registry[fragment];

			if (!item) {
				return null;
			}

			if (item.type !== 'folder') {
				return null;
			}

			return item;
		}, navigation);
}
