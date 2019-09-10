/* Function to enable on formLoad and also on Optionset1 OnChange Event
context: pass the form context as first parameter */
var new_optionset2_globalOptions;
function validateOptionSet(context){
    var formContext = context.getFormContext();
    var new_optionset1 = formContext.getAttribute("new_optionset1");
    var new_optionset2 = formContext.getAttribute("new_optionset2");
    if(new_optionset2_globalOptions===undefined) 
    new_optionset2_globalOptions = new_optionset2.getOptions();
    var options1notAllowed = [71000000,71000001,71000002,71000003]; //Set your options  (Number) not allowed for option 1
    var options2notAllowed = [71000005,71000006,71000007,71000008]; //Set your options (Number) not allowed for option 2
    if(new_optionset1.getValue()===71000000)//values of optionset1
        removeOptions(formContext,options1notAllowed,new_optionset2_globalOptions);   
    else if(new_optionset1.getValue()===71000001)//values of optionset1
        removeOptions(formContext,options2notAllowed,new_optionset2_globalOptions);
    else
        removeOptions(formContext,null,new_optionset2_globalOptions);  
    

}

/*Function to add and clear options
formContext: pass the form context as first parameter
optionsNotAlowed: values not allowed to be shown
originalOptions : the global options of the optionset 2
*/
function removeOptions(formContext,optionsNotAlowed, originalOptions){
  var attrLogicalName = "new_optionset2";
  var attr = formContext.getAttribute(attrLogicalName);
  var option;
  if(attr.getValue()!==null)
    option = attr.getOption(attr.getValue());
  formContext.getControl(attrLogicalName).clearOptions();
  if(optionsNotAlowed!==null){
  originalOptions.forEach(function(element){
    formContext.getControl(attrLogicalName).addOption(element); 
  }); 
  optionsNotAlowed.forEach(function(element){
    formContext.getControl(attrLogicalName).removeOption(element);
   });
}
    if(option!==undefined)
    attr.setValue(option.value);
}
/* Function to enable on  Optionset1 OnChange Event
context: pass the form context as first parameter */
function clearoption2(context){
    var formContext = context.getFormContext();
    formContext.getAttribute("new_optionset2").setValue(null)
}

