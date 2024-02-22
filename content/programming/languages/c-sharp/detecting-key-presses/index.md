---
authors: [ "Geoffrey Hunter" ]
date: 2013-05-31
draft: false
title: Detecting Key Presses
type: page
---

## WinForms

Use the following code to detect a key press when focus is on a particular object.

{{% aside type="note" %}}
There is different syntax for WPF.
{{% /aside %}}

```c#    
TextBox tb = new TextBox();

// Assign a new event handler
tb.KeyDown += new KeyEventHandler(tb_KeyDown);

// The event handler
private void tb_KeyDown(object sender, KeyEventArgs e) {
    if (e.KeyCode == Keys.Enter) {
        //Enter key is down

        //Capture the text
        if (sender is TextBox) {
            TextBox txb = (TextBox)sender;
            MessageBox.Show(txb.Text);
        }
    }
}
```

## WPF

## Non-Binding Method

Use the following code to detect a key press when focus is on a particular object.

{{% aside type="note" %}}
There is different syntax for WinForms.
{{% /aside %}}

```c#    
TextBox tb = new TextBox();

// Assign a new event handler
tb.KeyDown += new KeyEventHandler(tb_KeyDown);

private void tb_KeyDown(object sender, KeyEventArgs e) {
    if (e.Key == Key.Enter) {
        e.Handled = true;
        MessageBox.Show("You pressed Enter!");
    }
}
```