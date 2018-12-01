---
author: gbmhunter
date: 2016-11-08 15:20:04+00:00
draft: false
title: ComboBoxes
type: page
url: /programming/languages/java/javafx/comboboxes
---

# Associating With An Enum

One of the tidiest ways of populating a JavaFX ComboBox is to associate it with an enumeration. The enumeration defines the objects you can select from in the ComboBox, as well as how to display these objects (their String representations).

First, we need to create an enum:

```java    
public enum MyEnum {

    OPTION_1("Option 1"),
    OPTION_2("Option 2"),
    OPTION_3("Option 3"),
    ;

    private String label;

    MyEnum(String label) {
        this.label = label;
    }

    @Override
    public String toString() {
        return label;
    }

}
```

Then, to populate the ComboBox, just type:

```java    
myComboBox.getItems().setAll(MyEnum.values());
```

To select an item from code (useful for say, setting the default value of the ComboBox ), type:

```java    
myComboBox.getSelectionModel().select(MyEnum.OPTION_1);
```

Notice we are now dealing with objects, rather than having to parse strings!