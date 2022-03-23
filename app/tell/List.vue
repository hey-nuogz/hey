<template>
	<module>
		<template v-for="(pushes, app) of pushesAll" :key="`push-${app}`">
			<p-app>
				<p-title>● {{app}}</p-title>

				<template v-for="(push, indexPush) of pushes" :key="`push-${app}-${indexPush}`">
					<p-push @click="actionPush(push, app)">
						<p-title>○ {{push.title}}</p-title>
						<p-body>{{push.body}}</p-body>
						<p-body>{{push.time}}</p-body>
					</p-push>
				</template>
			</p-app>
		</template>
	</module>
</template>

<script setup>
	import { inject, ref } from 'vue';

	const wock = inject('$wock');


	const pushesAll = ref({});


	const handles = {
		link(link) { if(link) { window.open(link); } }
	};

	const actionPush = (push, app) => {
		const handle = handles[push.type];

		if(typeof handle == 'function') { handle(push.data, push, app); }
	};


	wock.add('new-push', (push,app) => {
		(pushesAll.value[app] ?? (pushesAll.value[app] = [])).unshift(push);

		const notification = new Notification(push.title, {
			body: push.data,
			icon: push.icon,
			badge: push.badge,
			data: push.data,
			tag: 'app'
		});

		notification.onclick = () => actionPush(push, app);
	});



</script>

<style lang="sass" scoped>
p-app
	@apply block w-full p-2
p-push
	@apply block bg-blue-100 m-4 mb-8 p-4 shadow-mdd rounded-md cursor-pointer
	width: calc(100% - 2rem)

	p-title
		@apply block mb-4

	p-body
		@apply block m-2
</style>