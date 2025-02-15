import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const DropDown=({ratingValues,onChange,label,placeholder}:{ratingValues:string[],onChange:(value:string)=>void,label:string,placeholder:string})=>{

    return(
        <Select onValueChange={onChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{label}</SelectLabel>
                      {
                        ratingValues.map((value)=>(
                          <SelectItem value={`${value}`}>{value}</SelectItem>
                        ))
                      }
                    </SelectGroup>
                  </SelectContent>
                </Select>
    )
}