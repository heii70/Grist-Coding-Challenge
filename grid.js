// store array grid data
var data = require("./sample.json")
//var data = require("./data.json");

// variables
var row_length = data.length-1;
var col_length = data[0].length-1;
var sum_max = [];
var path = [];

for(i = 0; i <= row_length; i++) {
	sum_max[i] = [];
	for(j = 0; j < col_length; j++)
	{	
		sum_max[i][j] = 0;
	}
}

// sum maxtrix: stores the maximum intermidiate and final path values 
for(i = 0; i <= row_length; i++) {
	for(j = 0; j <= col_length; j++)
	{
		//start
		if(i == 0 && j == 0)
			sum_max[i][j] = data[i][j];
		//first row: The only preceding total is the total to their left
		else if(i == 0)
			sum_max[i][j] = sum_max[i][j-1] + data[i][j];
		//first column: The only preceding total is the total from above 
		else if(j == 0)
			sum_max[i][j] = sum_max[i-1][j] + data[i][j];
		//everything else: Compare which of the preceding totals is larger and then add
		else
			sum_max[i][j] = Math.max(sum_max[i][j-1],sum_max[i-1][j]) + data[i][j];
	}
}

//backtrack to find path 
while(row_length > 0 || col_length > 0)
{
	//last row
	if(row_length == 0)
	{
		col_length -= 1;
		path.push('R');
	}
	//last column
	else if(col_length == 0)
	{
		row_length -= 1;
		path.push('D');
	}
	//top path value is greater than left path value
	else if(sum_max[row_length-1][col_length] > sum_max[row_length][col_length-1])
	{
		row_length -= 1;
		path.push('D');
	}
	//top path value is less or equal than left path value
	else 
	{
		col_length -= 1;
		path.push('R');
	}
}

// print results

console.log('Path: ', [path.reverse().toString()], '\n');
console.log('Max Path Value: ', sum_max[data.length-1][data[0].length-1]);