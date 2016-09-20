(function (root) {
    var EMPTY = root.maze.EMPTY;
    var WALL = root.maze.WALL;
    var PATH = root.maze.PATH;
    var CURRENT = root.maze.CURRENT;

    /**
     * Функция находит путь к выходу и возвращает найденный маршрут
     *
     * @param {number[][]} maze карта лабиринта представленная двумерной матрицей чисел
     * @param {number} x координата точки старта по оси X
     * @param {number} y координата точки старта по оси Y
     * @returns {[number, number][]} маршрут к выходу представленный списоком пар координат
     */

    function solution(maze, x, y) 
    {
        var path=[];                                                    //массив под путь
		var pathStepAgo=[];												//массив под путь обратного хода
        var mazecopy=maze;          								    //копируется массив блоков, чтобы не измеить его
        var numstep;             								        //переменная для хранения количества шагов, которые нужно сделать, чтобы вернуться до блока, у которого есть рядом пустой блок
		function search(x,y)     								        //функция поиска пути
		{
			var visiblearea=     								        //обект, хранящий тип блока и его координаты.Используется для просмотра близлежащих облоков
			{
				typeblock:[],
				coordXY:[]
			};
			var stepago=false;   										//переменная, которая используется для возврата в предыдущий бок
			
			visiblearea.typeblock.push(mazecopy[y+1][x]);
			visiblearea.coordXY.push([x,y+1]);
			visiblearea.typeblock.push(mazecopy[y][x+1]);
			visiblearea.coordXY.push([x+1,y]);
			if(y!=0)													//если вдруг у=0, то будет вылетать ошибка 
				{
					visiblearea.typeblock.push(mazecopy[y-1][x]);
					visiblearea.coordXY.push([x,y-1]);
				}else
					{
					visiblearea.typeblock.push([]);
					visiblearea.coordXY.push([]);
					}
			visiblearea.typeblock.push(mazecopy[y][x-1]);
			visiblearea.coordXY.push([x-1,y]);
			
			for(var i=0;i<4;++i)                                        //цикл, который просматривает близлежащие блоки
				{
					if(visiblearea.typeblock[i]==EMPTY)                 //если есть пустой блок, то переходим к нему
						{			
							if(pathStepAgo.length!=0)
								{
									pathStepAgo.forEach(function(value){path.push(value);});
								}		
							path.push(visiblearea.coordXY[i]);
							mazecopy[visiblearea.coordXY[i][1]][visiblearea.coordXY[i][0]]=PATH;  //в копии массива отмечается, что "мы" били в этом блоке
							stepago=true;
							numstep=0;	
							pathStepAgo=[];								
							break;
						}
				}
				
			if(!stepago)												//если пустого блока поблизости не оказалось, то необходимо вернуться назад, что тут делается.Переменная numstep есть количесво шагов до блока со свободным путем.
				{
					i=0;
					visiblearea.coordXY[i]=path[path.length-1-numstep];
					pathStepAgo.push(visiblearea.coordXY[i]);
					numstep++;
					
				}	
				
			if(visiblearea.coordXY[i][1]!==mazecopy.length-1)			//если координа y=Y, то возвращается path.Нет? -> повторяется search.
				{
					return search(visiblearea.coordXY[i][0],visiblearea.coordXY[i][1]);
				}
			else
				{
					return path;
				}
		}
		
		search(x,y);
		return path;
	}

    root.maze.solution = solution;
})(this);
