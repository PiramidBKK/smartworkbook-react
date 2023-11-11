import React, { createContext, useContext, useState } from "react";

const ExportContext = createContext();

export const ExportUnit = ({children}) =>{
    const [exportData, setExportData] = useState();

    const setExport = (data =>{
        setExportData(data);
        console.log(data);
    })

    return(
        <ExportContext.Provider value={{exportData, setExport}}>
            {children}
        </ExportContext.Provider>
    )

}

export const useExport = () =>{
    const context = useContext(ExportContext);
    console.log(context);
    return context;
}