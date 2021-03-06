class game_world extends world {
	/*
	name2 is the worlds name
	wh is the screen width height (an object like {w:200,h:300})
	*/
	constructor(name2,wh) {
		super(name2);
		var t = this;
		t.points = 0;
		t.numberOfMovers = 0;
		t.maxNumberOfMovers = 99;
		t.rank = 'average';
		t.sw = wh.w;//screen width height
		t.sh = wh.h;
	}

	init() {
		var t = this;
		//reset all
		t.entitys = [];
		t.points = 0;
		t.numberOfMovers = 0;
		//end reset
		var ph = loadImage('img/ph.jpg');

		var yplayer = new player(200, 300, '');
		yplayer.grafic_type = 'none';
		yplayer.debug = true;

		t.add(yplayer);
		t.create_movers(1);
	} //end init

	create_movers(number) {
		var t = this;
		if (t.numberOfMovers > t.maxNumberOfMovers) {
			return;
		}
		for (var i = 0; i < number; i++) {
			var ymover = new mover(100, 100, '');
			ymover.debug = true;
			ymover.grafic_type = 'none';
			t.add(ymover);
			t.numberOfMovers++;
		}
	} //end create_movers
	render() {
		var t = this;
		super.render();
		fill(255);
		textAlign(CENTER);
		text('Score: ' + t.points, t.sw / 2, 20);
		text('Rank: ' + t.rank, t.sw / 2, 40);
	} //end render
	update() {
		super.update();
		var t = this;
		t.points++;
		this.gameProgression();
	} //end update
	gameProgression() {
		var p = this.points;
		if (p == 100) {
			this.create_movers(1);
			this.addCoin();
		}
		if (p == 500) {
			this.create_movers(1);
		}
		if (p == 1000) {
			this.create_movers(1);
			this.create_mine();
			this.create_mine();
			this.create_mine();
			this.rank = 'Good Avoider';
		}
		if (p == 1700) {
			this.create_movers(3);
		}
		if (p == 1900) {
			this.create_movers(4);
		}
		if (p == 4444) {
			this.create_movers(9);
			this.rank = 'Pro Avoider';
			this.addCoin();
		}
		if (p == 7500) {
			this.rank = 'Awesome Avoider';
			this.addCoin();
		}
		if (p == 12500) {
			this.rank = 'Extreme Avoider';
		}
		if (p == 20000) {
			this.rank = 'Hyper Avoider';
			this.addCoin();
			this.addCoin();
		}
		if (p == 31000) {
			this.rank = 'Crazy Avoider';
			this.addCoin();
		}
		if (p == 49000) {
			this.rank = 'Celebrity Avoider';
			this.addCoin();
			this.addCoin();
			this.addCoin();
		}
		if (p == 60000) {
			this.rank = 'God Avoider';
			this.addCoin();
			this.addCoin();
			this.addCoin();
			this.addCoin();
			this.addCoin();
			this.addCoin();
			this.addCoin();
		}
	} //end game progression
	addCoin() {
		var t = this;
		var RPX = Math.floor(Math.random() * t.sw + 1);
		var RPY = Math.floor(Math.random() * t.sh + 1);
		var dist = 100;
		//make sure the pos is not close to wall
		while(RPY >=t.sh-dist || RPY<=dist || RPX> t.sw-dist || RPX<=dist)
		{
			//new random pos
			RPX = Math.floor(Math.random() * t.sw + 1);
		    RPY = Math.floor(Math.random() * t.sh + 1);
		}
		var coinI = new coin(RPX, RPY);
		//coinI.debug = true;
		t.add(coinI);
	}
	create_mine() {
		var t = this;
		var mine = new mover();
		mine.grafic_type = 'none';
		mine.debug = true;
		t.add(mine);
		mine.isMine();
	}
}
