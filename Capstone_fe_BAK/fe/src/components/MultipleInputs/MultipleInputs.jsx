import React, {useState} from "react";
import {Button, Input, Typography} from "@material-tailwind/react";

const MultipleInputs = ({mappedObj, onClinkHandler, section, onChangeHandler, name, place}) => {
    return (
        <div>
            <Typography className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{section}</Typography>
            {
                Object.entries(mappedObj).map((element, index) => (
                    <div className="flex mb-4">

                        <Input type="text"
                               name={name + index}
                               id={index}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               placeholder={place}
                               onChange={(e) => onChangeHandler(e, index)}/>

                        <Button className="ml-4 bg-gray-900" onClick={onClinkHandler}>
                            +
                        </Button>
                    </div>
                ))
            }
        </div>
    )
}

export default MultipleInputs