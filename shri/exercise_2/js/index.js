(function (root) {
    var map = root.maze.MAZE_Y;
    var path = root.maze.solution(map, 1, 0);
	var container=root.maze.render(map, path);
	var fieldBlocks=[],fieldBlocksRow=[];
	var timer;
	var number=0;
	
	//Формирует матрицу fieldBlocks для того, чтобы была возможность обращаться к каждому из блоков (div) по отдельности.
	for(var i=0;i<map.length;i++)
		{
			for(var j=0;j<map[0].length;j++)
				{
					fieldBlocksRow.push(container.getElementsByClassName("maze__cell")[number]);
					number+=1;
				}
			fieldBlocks.push(fieldBlocksRow);
			fieldBlocksRow=[];
		}
	
	document.querySelector('.outer').appendChild(container);						//рисуется поле
	
	
	//функция, визуализирующая перемещене красного блока
	function forward()
	{
		if(path[1])
			{
				fieldBlocks[path[1][1]][path[1][0]].style.backgroundColor="#f21000";
				fieldBlocks[path[0][1]][path[0][0]].style.backgroundColor="#fad946";
				path.shift();
			}
		else {clearInterval(timer);}
	}
	
	timer=setInterval(forward,100);
})(this);


