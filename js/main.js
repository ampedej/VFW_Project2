/*
Project 2
Edward M Murray Jr
VFW 1210
main js File
*/

//Wait until DOM is ready.
window.addEventListener("DOMContentLoaded", function(){
	
	//getElementsById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Recipe Type Select element
	function makeTypes(){
		var formTag = document.getElementsByTagName("form"),
			selectLi = $('select'),
			selectType = document.createElement('select');
			selectType.setAttribute("id", "rtype");
		for (var i=0, j=recipeTypes.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = recipeTypes[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			selectType.appendChild(makeOption);
		}
		selectLi.appendChild(selectType);
	}
	
	//Find value of Category Radio
	function getSelectedRadio(){
		var radios = document.forms[0].category;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				categoryValue = radios[i].value;
			}
		}
	}
		
	//Toggle Controls Function
	function toggleControls(n){
		switch(n){
			case "on":
				$('recipeForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display  = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('recipeForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display  = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	//Store Data Function
	function storeData(){
		var id					= Math.floor(Math.random()*100000001);
		getSelectedRadio()
		var item				= {};
			item.rname 			= ["Recipe Name:", $('rname').value];
			item.dateadded 		= ["Date Added:", $('dateadded').value];
			item.rating 		= ["Rating:", $('rating').value];
			item.category 		= ["Category:", categoryValue];
			item.rtype 			= ["Recipe Type:", $('rtype').value];
			item.ringredients 	= ["Recipe Ingredients:", $('ringredients').value];
			item.rdirections 	= ["Recipe Directions:", $('rdirections').value];
			
		//Save into local storage
		localStorage.setItem(id, JSON.stringify(item));
		alert("Recipe Saved!");
	}
	
	//Get Data Function
	function getData(){
		toggleControls("on")
		if(localStorage.length === 0){
			alert("There are no recipes stored. Add new recipe!");
			window.location.reload(); //Reload page if no data stored instead of going to data storage page.
			return false;
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, length=localStorage.length; i<length; i++){
			var makeLi = document.createElement('li');
			makeList.appendChild(makeLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeLi.appendChild(makeSubList);
			for (var n in obj){
				var makeSubLi = document.createElement('li');
				makeSubList.appendChild(makeSubLi);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubLi.innerHTML = optSubText;
			}
		}
	}
	
	//Clear Local Function
	function clearLocal(){
		if(localStorage.length === 0){
			alert("No recipes to clear.");
		}else{
			localStorage.clear();
			alert("All recipes have been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable Defaults
	var recipeTypes = ["--Meats--", "Chicken", "Beef", "Pork", "Fish", "--Pasta--", "Spaghetti", "Lasagna", "Pasta Salad", "Ravioli", "--Soups--", "Chili", "Chowder", "Stew", "Seafood", "--Dessert--", "Cake", "Cookies", "Pie", "Mousse"],
		categoryValue;
	makeTypes();
	
	//Link & click submit events.
	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", storeData);
	
});
