// check to see if any database upgrades or localStorage cleanups are necessary
(function () {
	// create a database if there isn't one
	if (localStorage.okcp === undefined) {
		localStorage.okcp = JSON.stringify({
			dataModelVersion: '1.1.0',
			profileList: {},
			settings: {}
		});
	}

	var storage = JSON.parse(localStorage.okcp);
	storage.dataCleanupJobNumToReach = '1.1.34';

	if (storage.dataCleanupJobNum === storage.dataCleanupJobNumToReach) {
		return false;
	}

	var upgradeMessage = ['Data Cleanup Run:'];

	// confirm that proper keys exist
	storage.settings = storage.settings || {};
	storage.profileList = storage.profileList || {};

	// if backup isn't current, create a backup
	if (localStorage.okcpBackup_1_1_33 === undefined) {
		localStorage.okcpBackup_1_1_33 = localStorage.okcp;
		upgradeMessage.push('  * Created a database backup (version 1.1.33)');
	}

	// clean up deprecated keys
	var deprecatedKeys = ['okcpSettings','okcp_b130110','okcp_b130124'];
	for (var i = 0; i < deprecatedKeys.length; i++) {
		if (!!localStorage[deprecatedKeys[i]]) {
			localStorage.removeItem(deprecatedKeys[i]);
			upgradeMessage.push('  * Removed deprecated key ('+deprecatedKeys[i]+')');
		}
	}

	// upgrade data model from 1.x if needed
	if (storage.hiddenProfileList !== undefined) {
		var oldData = storage;
		var newData = {
			'dataModelVersion': '1.1.0',
			'profileList': {}
		};
		for (i=0; i < oldData.hiddenProfileList.length; i++) {
			newData.profileList[oldData.hiddenProfileList[i]] = {h:true};
		}
		localStorage.okcp = JSON.stringify(newData);
		upgradeMessage.push('  * Updated Data Model to Version 1.1.0');
	}

	storage.dataCleanupJobNum = storage.dataCleanupJobNumToReach;
	localStorage.okcp = JSON.stringify(storage);

	console.log(upgradeMessage.join('\n'));
})();

// default questions
localStorage.okcpDefaultQuestions = JSON.stringify([
	//poly
	{
		qid:"99709", //Do you consider yourself polyamorous?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"131794", //How do you feel about polyamory? (multiple relationships)
		category: "poly",
		wrongAnswers:["That's cheating, monogamy is the only way to go","I'm open to the concept, but its not for me","Like swingers?"]
	},
	{
		qid:"52827", //Would you consider connecting with someone whose relationship status is 'seeing someone' or 'married'?
		category: "poly",
		answers:[],
		conclusiveAnswers:[],
		wrongAnswers:["No to both","Yes to 'married' only"]
	},
	{
		qid:"325", //Would you consider having an open relationship (i.e., one where you can see other people)?
		category: "poly",
		wrongAnswers:["No"]
	},
	{
		qid:"1128", //Would you date someone who was already in a committed relationship with someone else?
		category: "poly",
		wrongAnswers:["Yes, even in secret.","No, it's wrong.","No, but I don't think it's inherently wrong."]
	},
	{
		qid:"16371", //Someone in an open relationship asks you out on a date. You:
		category: "poly",
		wrongAnswers:["Refuse / Aren't interested in open relationships."]
	},
	{
		qid:"33107", //Would you consider being part of a commited polyamorous relationship - ie, three or more people but no sex outside the group?
		category: "poly",
		wrongAnswers:["I am commited to total monogamy"]
	},
	{
		qid:"41242", //Your significant other is traveling and has the opportunity to stay with a good friend that you know they find to be very attractive. What's your stance on the situation?
		category: "poly",
		wrongAnswers:["It would be totally unacceptable."]
	},
	{
		qid:"48278", //Would you consider dating someone who is already involved in an open or polyamorous relationship?
		category: "poly",
		wrongAnswers:["No."]
	},
	{
		qid:"44540", //If you were in a serious relationship, would you mind if your significant other maintained an active profile on OkCupid?
		category: "poly",
		wrongAnswers:["Yes - I would mind this."]
	},
	{
		qid:"1121", //Have you ever had multiple romantic partners during the same time period?
		category: "poly",
		wrongAnswers:["Yes, and I didn't tell at least one of them."]
	},
	{
		qid:"423049", //If your partner told you they wanted to sleep with someone else, how would you react to that?
		category: "poly",
		wrongAnswers:["That would be a deal breaker."]
	},
	{
		qid:"28742", //Is it okay for a married person to play around with someone with the permission of their spouse?
		category: "poly",
		wrongAnswers:["No"]
	},
	//posessive
	{
		qid:"784", //Would you be okay with your significant other spending a lot of time with one of his/her exes (as a friend)?
		category: "notPosessive",
		wrongAnswers:["No"]
	},
	//science
	{
		qid:"612", //Should evolution and creationism be taught side-by-side in schools?
		category: "science",
		wrongAnswers:["No, evolution has no place in schools", "Yes, students should hear both sides"]
	},
	{
		qid:"15889", //Do you put more weight in science or faith?
		category: "science",
		wrongAnswers:["Faith","Equally in both"]
	},
	{
		qid:"126793", //How do you believe the universe most likely came into existence?
		category: "science",
		wrongAnswers:["God or gods created it within the last 10k years","God or gods created it a very long time ago"]
	},
	{
		qid:"409", //A "shooting star" is a star that...
		category: "science",
		wrongAnswers:["...burned out, and collapsed","...collided with Earth's atmosphere","...got sucked into a black hole"]
	},
	{
		qid:"258", //Did America really put a man on the moon?
		category: "science",
		wrongAnswers:["No"]
	},
	//children
	{
		qid:"80041", //Are you looking for a partner to have children with?
		category: "children",
		wrongAnswers:["Yes"]
	}/*,
	// Fetish
	{
		qid:"67511", //Suppose you're dating someone who seems to have long-term potential. You discover that they want to urinate on you during sex. Would you consider staying with this person?
		category: "fetish",
		wrongAnswers:["No."]
	},
	{
		qid:"1401", //Have you ever had a sexual encounter with someone of the same sex?
		category: "fetish",
		wrongAnswers:["No, and I would never."]
	},
	{
		qid:"665", //Are you fetish-friendly?
		category: "fetish",
		wrongAnswers:["Ew!"]
	},
	//BDSM
	{
		qid:"463", //In your ideal sexual encounter, do you take control, or do they?
		category: "bdsm",
		wrongAnswers:["I take control"]
	},
	{
		qid:"84005", //As an adult, have you ever worn a leash and collar in public?
		category: "bdsm",
		wrongAnswers:["No."]
	}/*,
	//aggressionSensitive
	{
		qid:"55349", //Have you ever thrown an object in anger during an argument?
		category: "aggressionSensitive",
		wrongAnswers:["Yes."]
	},
	{
		qid:"386", //If someone intentionally damaged your property, would you be more likely to call the police, or to fight them?
		category: "aggressionSensitive",
		wrongAnswers:["Fight them"]
	},
	{
		qid:"6689", //Are you quietly angry a lot of the time?
		category: "aggressionSensitive",
		wrongAnswers:["Yes"]
	}*/
]);