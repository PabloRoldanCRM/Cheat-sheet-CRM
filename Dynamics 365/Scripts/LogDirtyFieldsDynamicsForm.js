(function getDirtyValues(){
    var allAttributes = Xrm.Page.data.entity.attributes.get();
    var listofDirtyAttri = "";
    if (allAttributes != null) {
        for (var i in allAttributes) {
            if (allAttributes[i].getIsDirty()) {
                listofDirtyAttri += allAttributes[i].getName() + "\n";
            }
        }
    }
    return listofDirtyAttri;
})();