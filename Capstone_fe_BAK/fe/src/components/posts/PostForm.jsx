import {Button, Input, Menu, MenuHandler, MenuItem, MenuList, Textarea, Typography,} from "@material-tailwind/react";
import React, {useState} from "react";

const PostForm = ({
                      change,
                      submit,
                      onChangeSetFile,
                      isFileUploadEnabled,
                      isMenuEnabled,
                      header,
                      mainPicPlaceholder,
                      titlePlaceholder,
                      descPlaceholder,
                      telescopePlaceholder,
                      cameraPlaceholder,
                      filtersBand,
                      constPlaceholder,
                      latPlaceholder,
                      longPlaceholder,
                      raPlaceholder,
                      decPlaceholder,
                      datePlaceholder,
                      buttonText
                  }) => {

    const [catalog, setCatalog] = useState('Seleziona catalogo')
    const [band, setBand] = useState('Band')

    const bands = [
        'Broadband (use this if you use color camera)',
        'Narrowband',
    ]

    const catalogs = [
        'NGC',
        'LBN',
        'HCG',
        'ZWG',
        'HR',
        'IC',
        'UGC',
        'KUG',
        'FCC',
        'DDO',
        'ARP',
        'MGC',
        'ESO'
    ]

    return (
        <div className="flex flex-col items-center justify-center">

            <Typography variant="h1" className="text-blue_gray-100">
                {header}
            </Typography>

            <form className="mt-8 mb-2 2xl:w-96 max-w-screen-lg w-80" encType="multipart/form-data" onSubmit={submit}>
                <div className="mb-1 flex flex-col gap-6">
                    {
                        isFileUploadEnabled &&
                        <>
                            <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                                Upload a file
                            </Typography>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input" type="file"
                                onChange={onChangeSetFile}
                                placeholder={mainPicPlaceholder}
                                name={"mainPic"}
                            />
                        </>
                    }
                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Title
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={titlePlaceholder}
                        name="title"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />

                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Object
                    </Typography>
                    <Input
                        size="lg"
                        placeholder="NGC6960"
                        name="object"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />

                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Description
                    </Typography>
                    <Textarea
                        size="lg"
                        placeholder="NGC 6960 è una nebulosa..."
                        name={descPlaceholder}
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    >
                    </Textarea>
                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Telescope
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={telescopePlaceholder}
                        name="telescope"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />
                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Camera
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={cameraPlaceholder}
                        name="camera"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />


                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Mount
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={telescopePlaceholder}
                        name="mounts"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />


                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Guide
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={telescopePlaceholder}
                        name="guides"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />

                    <Menu placement="bottom-start">
                        <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                            Filters
                        </Typography>
                        <MenuHandler>
                            <Button
                                ripple={false}
                                variant="text"

                                className="flex h-10 items-center border-blue-gray-200 bg-blue_gray-900 hover:bg-blue_gray-800 pl-3"
                            >
                                <Typography variant={"h6"} className="text-blue_gray-200">{band}</Typography>
                            </Button>
                        </MenuHandler>
                        <MenuList className="max-h-[20rem] max-w-[18rem]">
                            {bands.map(bands => {
                                return (
                                    <MenuItem
                                        value={bands}
                                        className="flex items-center gap-2 text-blue_gray-100"
                                        onClick={() => setBand(bands)}
                                    >
                                        {console.log(band)}
                                        <span className="text-center text-blue_gray-900">{bands}</span>
                                    </MenuItem>
                                );
                            })}
                        </MenuList>
                        {band === "Narrowband" && (
                            <div className="flex justify-center items-center">
                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    Ha
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Ha"
                                    name="ha"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />
                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    Oiii
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Oiii"
                                    name="oiii"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />

                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    Sii
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Sii"
                                    name="sii"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />
                            </div>)}
                        {band === bands[0] && (
                            <div className="flex justify-center items-center">
                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    L
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Luminance"
                                    name="l"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />

                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    R
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Red"
                                    name="r"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />
                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    G
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Green"
                                    name="g"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />

                                <Typography variant="h6" className="p-4 text-blue_gray-100">
                                    B
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="Blue"
                                    name="b"
                                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                    onChange={change}
                                />
                            </div>)}
                    </Menu>

                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Constellation
                    </Typography>
                    <Input
                        size="lg"
                        name="constellation"
                        placeholder={constPlaceholder}
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />

                    <Typography variant="h6" className="-mb-3 text-blue_gray-100">
                        Place
                    </Typography>

                    <Typography variant="small" className="-mb-3 text-blue_gray-100">
                        N.B: These data are necessary to generate star chart
                    </Typography>


                    <div className="2xl:flex 2xl:justify-center 2xl:items-center">
                        <Typography variant="h6" className="p-4 text-blue_gray-100">
                            Lat
                        </Typography>
                        <Input
                            size="lg"
                            placeholder={latPlaceholder}
                            name="latitude"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={change}
                        />

                        <Typography variant="h6" className="p-4 text-blue_gray-100">
                            Long
                        </Typography>
                        <Input
                            size="lg"
                            placeholder={longPlaceholder}
                            name="longitude"
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                            onChange={change}
                        />
                    </div>
                </div>

                <div className="2xl:flex 2xl:justify-center 2xl:items-center">
                    <Typography variant="h6" className="p-4 text-blue_gray-100">
                        Ra
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={raPlaceholder}
                        name="ra"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />

                    <Typography variant="h6" className="p-4 text-blue_gray-100">
                        Dec
                    </Typography>
                    <Input
                        size="lg"
                        placeholder={decPlaceholder}
                        name="dec"
                        className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                        labelProps={{
                            className: "before:content-none after:content-none",
                        }}
                        onChange={change}
                    />
                </div>

                <Typography variant="h6" className="p-4 text-blue_gray-100">
                    Date
                </Typography>
                <Input
                    size="lg"
                    placeholder={datePlaceholder}
                    name="date"
                    className="!border-t-blue-gray-200 focus:!border-t-gray-900 text-blue_gray-100"
                    labelProps={{
                        className: "before:content-none after:content-none",
                    }}
                    onChange={change}
                />

                <div className="flex justify-center mt-5">
                    <Button type="submit" className="bg-[#cfd8dc]">
                        <Typography variant="h6" className="text-[#263238]">
                            {buttonText}
                        </Typography>
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default PostForm