---
authors: [ "Geoffrey Hunter" ]
date: 2017-06-05
draft: false
title: Linear Programming
type: page
---

<h2>Overview</h2>

<p>This page provides an introduction to linear programming, with examples which use GNU Linear Programming Toolkit C API.</p>

{{< img src="linear-programming-example-2d-graph-feasible-region-wikipedia.png" width="203px" caption="An example of linear programming with 2 variables. Image from www.wikipedia.com."  >}}

<h2>What Is Linear Programming Good For?</h2>

<p>Linear programming is good for **solving problems in the below form:</p>

<p>$$  
maximise \\  
z = 3x_1 + 4x_2 + 7x_3 \\  
subject to \\  
x_1 + x_2 + x_3 <= 10 \\  
x_2 - 5x_3 =5  
$$</p>

The <b>objective function</b> is the function we want to either <b>maximise or minimise</b>. In the above example, this is:

<p>$$ z = 3x_1 + 4x_2 + 7x_3 $$</p>

<p>\(z\) is the value we want to maximise, and it is dependent on \(x_1, x_2, ...\). The <b>constraints</b> are the equations which the solution is <b>"subject to"</b>. These are the following lines:</p>

<div>
$$ x_1 + x_2 + x_3 <= 10 \\  
x_2 - 5x_3 = 5 $$
</div>

<p>These limit the values of \(x_1, x_2, ...\). You can also have bounds for these variables, such as:</p>

<p>$$ 10 < x_1 >= 30 $$</p>

<p>However, these <b>bounds are just another way of writing a constraint</b>. In fact, the above bound can be written in constraint equation form as:</p>

<p>
$$ x_1 > 10 \\  
 x_1 <= 30 $$
</p>

<h2>GLPK</h2>

<h3>Building GLPK</h3>

<p>The GLPK source code can be downloaded from <a href="https://www.gnu.org/software/glpk/">https://www.gnu.org/software/glpk/</a>. This then has to be compiled/built for your computer.</p>

<h3>Solving The Example In GLPK</h3>

<p>GLPK can either (where the structural variables, x1, x2, ... are allowed to vary continuously) or perform mixed-integer programming, where the structural variables must take on a integer number. A sub-set of mixed-integer programming is binary programming, where the structural variables are only allowed to be the integers 0 or 1.</p>

<h3>Silencing GLPK</h3>

<p>By default, glpk prints a small amount of information to the terminal when the solver is run. To silence this, call:</p>

{{< highlight c >}}    
glp_term_out(GLP_OFF);
{{< /highlight >}}
