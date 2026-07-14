import { useQuery } from "@tanstack/react-query"
import { getAllEmployees } from "../api/employeeApis"

export let useEmployee = () => {
    let {data , isPending} = useQuery({
        queryKey: ['employees'],
        queryFn: getAllEmployees,
        staleTime: 100000,
    })
    return {
        isPending ,
        data
    }
}