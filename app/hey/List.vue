<template>
	<module>
		<Timer v-model="date" timer param="YD" align="center" label="消息日期" @update:model-value="query" />
		<template v-for="(pushes, token) of pushesAll" :key="`push-${token}`">
			<p-app>
				<p-app-title>○ {{profile.key[token]?.name || profile.key[token]?.app}}</p-app-title>

				<template v-for="(push, indexPush) of pushes" :key="`push-${token}-${indexPush}`">
					<p-push @click.exact="actionPush(push, token)" @click.ctrl="renotifyPush(push, token)">
						<p-title :title="push.title">● {{push.title}}</p-title>
						<p-body :title="push.body">{{push.body}}</p-body>
						<p-time :title="push.time">{{push.fromNow ?? ''}}</p-time>
					</p-push>
				</template>
			</p-app>
		</template>
	</module>
</template>

<script setup>
	import { inject, onMounted, ref } from 'vue';
	import Moment from '../lib/Moment.js';

	import Timer from '../lib/comp/Timer.vue';


	const wock = inject('$wock');
	const get = inject('$get');
	const profile = inject('profile');


	const pushesAll = ref({});
	const date = ref(Moment().format('YYYY-MM-DD'));


	const handles = {
		link(link) { if(link) { window.open(link); } }
	};

	const actionPush = (push, app) => {
		const handle = handles[push.type];

		if(typeof handle == 'function') { handle(push.data, push, app); }
	};
	const renotifyPush = (push, token) => {
		new Notification(`嘿！${push.title}`, {
			body: push.body,
			icon: push.icon,
			badge: push.badge,
			data: push.data,
			renotify: true,
			tag: `${profile.value.key[token]?.app}|${token}|${push.tag ?? ''}`
		});
	};


	const query = async () => {
		pushesAll.value = await get('hey/list', { date: Moment(date.value).format('YYMMDD') });

		updateFormNow();
	};


	const updateFormNow = () => {
		for(const pushes of Object.values(pushesAll.value)) {
			for(const push of pushes) {
				push.fromNow = Moment(push.time).fromNow();
			}
		}
	};
	onMounted(() => {
		setInterval(updateFormNow, 1000 * 10);
	});


	onMounted(async () => {
		query();


		wock.add('new-push', (push, app, token) => {
			(pushesAll.value[token] ?? (pushesAll.value[token] = [])).unshift(push);

			const notification = new Notification(`嘿！${push.title}`, {
				body: push.body,
				icon: push.icon,
				badge: push.badge,
				data: push.data,
				renotify: true,
				tag: `${app}|${token}|${push.tag ?? ''}`
			});

			notification.addEventListener('click', () => actionPush(push, app));
		});
	});




	/** @type {import('vue').Ref<import('../../../lib/TabAdmin.js').default>} */
	// const TA = inject('tabAdmin');
	// onMounted(() => TA.value.emitChange());
	// TA.value.addChanger('number', tab => { });
</script>

<style lang="sass" scoped>
[timer]
	@apply block m-4 w-60

p-app
	@apply block w-full p-2

p-app-title
	@apply block

p-push
	@apply inblock bg-blue-100 m-4 mb-8 p-4 shadow-mdd rounded-md cursor-pointer
	width: calc(25% - 2rem)

	&:hover
		@apply bg-blue-200

	p-title
		@apply block mb-4 elli

	p-body
		@apply block m-4 mb-4 elli

	p-time
		@apply block m-4 mb-0 text-sm text-gray-400
</style>
