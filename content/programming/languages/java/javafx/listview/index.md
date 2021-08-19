---
authors: [ "Geoffrey Hunter" ]
date: 2016-11-11 16:11:44+00:00
draft: false
title: ListView
type: page
---

## Creating A List View In FXML

Although this would not be the standard way to do it (normally a ListView would be populated by the backend Java code), you can create a ListView node using pure fxml code:

```html    
<ListView>
    <items>
        <FXCollections fx:factory="observableArrayList">
            <String fx:value="One"/>
            <String fx:value="Two"/>
            <String fx:value="Three"/>
            <String fx:value="Four"/>
            <String fx:value="Five"/>
        </FXCollections>
    </items>
</ListView>
```

Note that is important to wrap the String objects inside a `ObservableArrayList` object.