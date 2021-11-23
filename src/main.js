import Phaser from "phaser";
import * as SpinePlugin from 'node_modules/phaser/plugins/spine/dist/SpinePlugin';

const config = {
	type: Phaser.WEBGL,
	parent: 'content',
	autoFocus: true,
	input: true,
	scale: {
		width: '100%',
		height: '100%',
		expandParent: true,
		autoRound: true,
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	render:
	{
		antialias: true,
		antialiasGL: false,
		roundPixels: true,
		clearBeforeRender: false,
		powerPreference: "low-power",
		maxLights: 1,
		mipmapFilter: 'LINEAR'
	},
	scene: {
		preload: preload,
		create: create
	},
	plugins: {
		scene: [
			{
				key: 'SpinePlugin',
				plugin: window.SpinePlugin,
				mapping: 'spine'
			}
		]
	}
};

const game = new Phaser.Game(config);

function preload ()
{
	this.load.spine("vine", "./resources/vine.json", "./resources/vine.atlas", true);
}

function create ()
{
	const vine = this.add.spine(400, 600, 'vine', 'grow', false);
}