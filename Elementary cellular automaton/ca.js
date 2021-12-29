inlet = 1;
outlets = 1;


var mtrx = new JitterMatrix(1, "float32", 150, 150);
var left, right, me, next;

var ruleset = [0, 0, 0, 1, 1, 1, 1, 0];

function bang(){
	mtrx.setall(0);
	mtrx.setcell(mtrx.dim[0] / 2, 0, "val", 1);
	for(var i = 1; i < mtrx.dim[1]; i++){
		for(var j = 1; j < mtrx.dim[0] - 1; j++){
			me = mtrx.getcell(j, i - 1);
			left = mtrx.getcell(j - 1, i - 1);
			right = mtrx.getcell(j + 1, i - 1);
			next = rules(left, me, right);
			if(next == 1){
				mtrx.setcell(j, i, "val", 1);
			} else {
				mtrx.setcell(j, i, "val", 0);
			}
		}
	}
	outlet(0, "jit_matrix", mtrx.name);
}


function rules(a, b, c){
	var rule;
	if(a == 1 & b == 1 & c == 1) rule = ruleset[0];
	if(a == 1 & b == 1 & c == 0) rule = ruleset[1];
	if(a == 1 & b == 0 & c == 1) rule = ruleset[2];
	if(a == 1 & b == 0 & c == 0) rule = ruleset[3];
	if(a == 0 & b == 1 & c == 1) rule = ruleset[4];
	if(a == 0 & b == 1 & c == 0) rule = ruleset[5];
	if(a == 0 & b == 0 & c == 1) rule = ruleset[6];
	if(a == 0 & b == 0 & c == 0) rule = ruleset[7];
	return rule;
}

function rules_set(){
	ruleset = [];
	for(var i = 0; i < arguments.length; i++){
		ruleset.push(arguments[i]);
	}
}
