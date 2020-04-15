new Vue({
	el:'#app',
	data:{
		playerhealth:100,
		monsterhealth:100,
		isgameplaying:false,
		turns:[]
	},
	methods:{
		startgame: function()
		{
			this.playerhealth = 100;
			this.monsterhealth = 100;
			this.isgameplaying = true;
			this.turns = [];
		},
		attack:function(){
			var damage = this.calcdamage(3,10);
			this.monsterhealth -= damage;
			this.turns.unshift({
				isplayer:true,
				text:'player hits monster for' + damage
			});
			if(this.checkwin()){
				return;
			}
			this.monsterattack()
			
		},
		special:function(){
			var damage = this.calcdamage(10,20);
			this.monsterhealth -= damage;
			this.turns.unshift({
				isplayer:true,
				text:'player hits hard monster for ' + damage
			});
			if(this.checkwin()){
				return;
			}
			this.monsterattack();
		},
		heal:function(){
			if(this.playerhealth <=90){
				this.playerhealth += 10;
			}else{
				this.playerhealth = 100;
			}
			this.turns.unshift({
				isplayer:true,
				text:'player healed for 10'
			});
			this.monsterattack();
		},
		giveup:function(){
			this.isgameplaying = false;

		},
		calcdamage:function(min,max){
			return Math.max(Math.floor(Math.random()*max)+1,min);
		},
		checkwin:function(){
			if(this.monsterhealth <=0){
				if(confirm("you won!New game?")){
					this.startgame()
				}else{
					this.isgameplaying=false;
				}
				return true;
			}
			else if(this.playerhealth <=0){
				if(confirm("You lost!New game?")){
					this.startgame();
				}else{
					this.isgameplaying =false;
				}
				return true;
			}
			return false;
		},
		monsterattack:function(){
			var damage = this.calcdamage(5,12)
			this.playerhealth -= damage;
			this.checkwin();
			this.turns.unshift({
				isplayer:false,
				text:'monster hits the player for ' + damage
			});
		}
	}
});