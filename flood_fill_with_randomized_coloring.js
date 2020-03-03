class FloodFill {
  random_color = 0;
  start_position = 0;
  color_mapping = {};
  color_names = [];
  PAINT_FILL_INTERVAL = 0;
  PAGE_REFRESH_INTERVAL = 0;
  
  constructor(graph, color_mapping, PAGE_REFRESH_INTERVAL, PAINT_FILL_INTERVAL) 
  {
    this.graph = graph;
    this.color_mapping = color_mapping;
    this.load_colors();
    this.set_random_starting_position();
    this.set_random_color();
    this.build_visual_matrix();
    
    this.PAGE_REFRESH_INTERVAL = PAGE_REFRESH_INTERVAL;
    this.PAINT_FILL_INTERVAL = PAINT_FILL_INTERVAL;
  }
  
  set_random_starting_position()
  {
  	this.random_starting_position = Math.floor(Math.random() * this.graph.length);
    this.start_position = [this.random_starting_position, this.random_starting_position];
  }
  
  set_random_color()
  {
  	this.random_color = Math.floor(Math.random() * this.color_names.length);
  }
  
  load_colors()
  {
    for(var key in this.color_mapping)
    {
      this.color_names.push(key);
    }  
  }

  start() {
    this.fill(this.graph, this.start_position, this.color_mapping[this.color_names[this.random_color]]);
    setInterval(function() { location.reload();}, this.PAGE_REFRESH_INTERVAL);
  }
  
  paint_cell(graph, row, col, color) {
    var selector = ".row" + row.toString() + "  " + ".col" + col.toString();
    $(selector).css("background-color", color);
    graph[row][col] = 1;
  }

  fill(graph, start_position, color) {

    let queue = [start_position];
    let visited = {};
    let counter = 0;
    let paint_cell = this.paint_cell;
    let PAINT_FILL_INTERVAL = this.PAINT_FILL_INTERVAL;

    while (queue.length > 0) {

      let current_position = queue.pop();

      let row = current_position[0];
      let col = current_position[1];

      if (row >= 0 && row <= graph.length - 1 && col >= 0 && col <= graph.length - 1) {

        if (!(row.toString() + col.toString() in visited)) {

          if (graph[row][col] != 1) {
          
            (function() {
              setTimeout(function() {
                paint_cell(graph, row, col, color);
              }, PAINT_FILL_INTERVAL * counter);
            })(counter += 1)


            visited[row.toString() + col.toString()] = true;

            queue.unshift([row, col + 1]);
            queue.unshift([row, col - 1]);
            queue.unshift([row + 1, col]);
            queue.unshift([row - 1, col]);

          }

        }
      }

    }

  }
  
  build_visual_matrix()
  {
    for(let i = 0; i < this.graph.length; i++)
    {
      
      let html_row = "<div class='row row"+ i.toString() + "'>";
      
    	for(let j = 0; j < this.graph[0].length; j++)
      {
        html_row += "<div class='col col" + j.toString() + "' onclick=\"this.paint_cell(this.graph, " + i.toString() + ", " + j.toString() + ", '#FFF');alert('yello');\"></div>";
      }
      
      html_row += "</div>";
      $('.container').prepend(html_row);
      
    }
  }

}

class Graph {
	constructor(rows, columns)
  {
  	this.rows = rows;
    this.columns = columns;
    this.graph = [];
    this.build(rows, columns)
  }
  
	build(rows, columns)
  {    
  	
    for(let i = 0; i < rows; i++)
    {
    	let column_data = [];
      
    	for(let j = 0; j < columns; j++)
      {
      	column_data.push(0);
      }
      
      this.graph.push(column_data);
      
    }
        
  }
}

const PAINT_FILL_INTERVAL = 100;
const NUM_OF_ROWS = 10;
const NUM_OF_COLUMNS = 10;
const PAGE_REFRESH_INTERVAL = (NUM_OF_ROWS * NUM_OF_COLUMNS) * (PAINT_FILL_INTERVAL) + 5000;

let color_mapping = {
    "blue": "#34495e",
    "red": "#c0392b",
    "green": "#27ae60",
    "yellow": "#f1c40f",
    "orange": "#d35400",
    "grey": "#7f8c8d"
  };
let graph = new Graph(NUM_OF_ROWS, NUM_OF_COLUMNS);
let flood_fill = new FloodFill(graph.graph, color_mapping, PAGE_REFRESH_INTERVAL, PAINT_FILL_INTERVAL);

flood_fill.start();


