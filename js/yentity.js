class yentity
{
  constructor(x2,y2,g) 
  {
    this.x = x2;
	this.y  = y2;
	this.rot  = 0;//rotation
    this.type = "entity";
    this.world;
    this.ecount;
    this.active = true;
	this.w  = 20;//width height
	this.h  = 20;
	this.hitbw  = 20;//hitbox width
	this.hitbh  = 20;
	this.speed = 1;
	this.alpha = 255;
	this.zi = 1;//zIndex
	this.grafic = g;
	this.img;
	this.sprite = createSprite(this.x,this.y,this.w,this.h);
	this.grafic_type = "img";
	this.current_anim = "normal";
	this.debug;

  }//end constructor
  
  init()
  {
	var t = this;
	
	t.sprite.remove ();
	t.sprite.height = t.h;
	t.sprite.width = t.w;
	this.sprite = createSprite(this.x,this.y,this.w,this.h);

	if(t.grafic_type =="img")
	{
		t.grafic.resize(t.w, t.h);
		t.sprite.addImage('normal', t.grafic);
	}
	if(t.grafic_type =="none"){}

	t.sprite.setCollider('rectangle', 0,0, t.hitbw, t.hitbh);
  }//end init
  
  scale(s)
  {
	 this.sprite.scale = s;
  }
  set_wh(w,h)
  {
	 var t = this;
	 t.w = w;
	 t.h = h;
	 
  }//end set_wh
  
  sethb_wh(w2,h2)
  {
	var t = this;
	t.hitbw = w2;
	t.hitbh = h2;
  }//end sethb_wh
  
  move_by(sx,sy)
  {
	var t = this;

	t.sprite.position.x += sx*(deltaTime/ 50);
	t.sprite.position.y += sy*(deltaTime/ 50);
	
  }//end move_by
  
  setxy(sx,sy)
  {
	var t = this;
	t.x = sx;
	t.y = sy;
	t.sprite.position.x = sx;
	t.sprite.position.y = sy;
  }//end setxy
  
  sx(x2)
  {
	var t = this;
	t.x = x2;
	t.sprite.position.x = x2;
  }//end setx
  
  sy(y2)
  {
	var t = this;
	t.y = y2;
	t.sprite.position.y = y2;
  }//end sety
  
  
  
	hit_test(type,x2,y2)
	{
		var t = this
		t.sprite.setCollider('rectangle', x2,y2, t.hitbw, t.hitbh);
		//entity array from current world
		var entity_list = t.get_by_type(type);
	
		//length of the array
		var entity_list_len = entity_list.length-1;
		var e;
		for (var i  in entity_list) 
		{
			
			e = entity_list[i];
			if(t.sprite.overlap(e.sprite))
			{
				return e;
			}
		}//end for
		
		return false;
	}//end hit_test


	show_hitbox()
	{
		var t = this;
		if(!this.debug){return;}
		t.sprite.debug=true
	}//end show_hitbox

	update()
	{  
		var t = this;
		//make sure xy == sprite xy
		if(t.x != t.sprite.position.x || t.y != t.sprite.position.y)
		{
			t.x = t.sprite.position.x  ;
			t.y = t.sprite.position.y ;
		}
		//same for zindex
		if(t.zi != t.sprite.depth){ t.sprite.depth = t.zi; }

	}//end update
  
	render()
	{
		var t = this;
		if(t.grafic_type =="img")
		{
			
			tint(255, t.alpha);
			t.sprite.changeAnimation(t.current_anim);
		}
		if(t.grafic_type =="none"){}
		t.show_hitbox();

	}//end render

	remove()
	{
	  
	}//end remove
  
	get_by_type(type)
	{
		//entity array from current world
		var entity_list = this.world.entitys;
		
		//length of the array
		var entity_list_len = entity_list.length-1;
		
		var entity_catch = [];
		//loop all entitys
		for (var i in entity_list) 
		{

			var entity_type =entity_list[i].type;
			
			if(type == entity_type)
			{ 
				entity_catch.push(entity_list[i]);
			}
		}
		return entity_catch;
	}//end get_by_type
	
	clicked(e)
	{
		var t = this;
		var ret = false;
		//mouce overlaps hitbox
		var overlapm = t.sprite.overlapPoint(mouseX,mouseY);
		//mouse down
		if(e==1)
		{
			if(mouseIsPressed && overlapm)
			{
				ret = true;
			}
		}
		//released
		if(e==2)
		{
			if(mouseWentUp(LEFT) && overlapm)
			{
				ret = true;
			}
		}
		//hover
		if(e==3)
		{
			if(overlapm)
			{
				ret = true;
			}
		}
		return ret;
	}//end clicked
  
}//end yentity