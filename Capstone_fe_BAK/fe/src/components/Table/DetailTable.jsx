import {Card, Typography} from "@material-tailwind/react";
import {nanoid} from "nanoid";

const DetailTable = (
    {
        telescope,
        camera,
        narrow,
        broad,
        lat,
        long,
        date,
        guide,
        mounts,
        constellation,
        ra,
        dec,

        enableDesc

    }) => {

    const TABLE_ROWS = [
        {
            telescope: telescope,
            camera: camera,
            narrowband: narrow,
            broadband: broad,
            mounts: mounts,
            guide: guide,
            lat: lat,
            long: long,
            date: date,
            constellation: constellation
        }
    ];

    return (
        <div>
            <Card className="w-full p-4 xl:w-full 2xl:w-[100rem] overflow-scroll">
                <Typography variant="h3" className="text-center m-4">
                    Instrumentation
                </Typography>
                <table className="lg:w-full lg:min-w-max table-auto text-center">
                    <tbody>
                    {TABLE_ROWS.map(({telescope}, index) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Telescope
                                </Typography>
                            </th>
                            <td className="p-4">
                                {telescope}
                            </td>
                        </tr>
                    ))}

                    {TABLE_ROWS.map(({camera}, index) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Camera
                                </Typography>
                            </th>
                            <td className="p-4">
                                {camera}
                            </td>
                        </tr>
                    ))}

                    {TABLE_ROWS.map(({narrowband}) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Narrowband filters
                                </Typography>
                            </th>
                            <td className="p-4">
                                {narrowband}
                            </td>
                        </tr>
                    ))}


                    {TABLE_ROWS.map(({broadband}) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Broadband filters
                                </Typography>
                            </th>
                            <td className="p-4">
                                {broadband}
                            </td>
                        </tr>
                    ))}

                    {TABLE_ROWS.map(({mounts}) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Mounts
                                </Typography>
                            </th>
                            <td className="p-4">
                                {mounts}
                            </td>
                        </tr>
                    ))}

                    {TABLE_ROWS.map(({guide}) => (
                        <tr key={nanoid()} className="even:bg-blue-gray-50/50 h-20">
                            <th>
                                <Typography variant="h6">
                                    Guide cameras
                                </Typography>
                            </th>
                            <td className="p-4">
                                {guide}
                            </td>
                        </tr>
                    ))}

                    </tbody>
                </table>
            </Card>
            {enableDesc && (
                <Card className="w-full p-4 xl:w-full 2xl:w-[100rem] overflow-scroll mt-12">
                    <Typography variant="h3" className="text-center">
                        Description
                    </Typography>
                    <table className="w-full min-w-max table-auto text-center">
                        <tbody>
                        {TABLE_ROWS.map(({lat, long}, index) => (
                            <tr key={nanoid()} className="even:bg-blue-gray-50/50">
                                <th>
                                    <Typography variant="h6">
                                        Coordinates
                                    </Typography>
                                </th>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        Lat-Long: {lat} {";"} {long}
                                    </Typography>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        Ra-Dec: {ra} {";"} {dec}
                                    </Typography>
                                </td>
                            </tr>
                        ))}

                        {TABLE_ROWS.map(({date}, index) => (
                            <tr key={nanoid()} className="even:bg-blue-gray-50/50">
                                <th>
                                    <Typography variant="h6">
                                        Date
                                    </Typography>
                                </th>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {date}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>

    );
}

export default DetailTable