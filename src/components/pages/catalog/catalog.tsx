import { Box, Button, Checkbox, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Switch, TextField, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { isNamedTupleMember } from "typescript";
import { getConstructions, getFilterConstructions, host } from "../../../http-routes";
import { IRentItem } from "../../../types";
import Posts from "../../posts/posts";

interface IFilter {
    minCost: number,
    maxCost: number,
    createdAtUtcOrder: boolean,
    type: string,
    minSquare: number,
    maxSquare: number,
    minYear: number,
    maxYear: number,
    numberOfRooms: number | null,
    floor: number | null
  }

const Catalog: FC = () => {
    const [posts, setPosts] = useState<IRentItem[]>([])
    const [filter, setFilter] = useState<IFilter>({
        minCost: 0,
        maxCost: 10000,
        createdAtUtcOrder: true,
        type: "",
        minSquare: 0,
        maxSquare: 10000,
        minYear: 1000,
        maxYear: 2023,
        numberOfRooms: null,
        floor: null
    })

    useEffect(() => {
        fetch(getFilterConstructions(host, 1, 10), {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filter)
        })
            .then(response => response.json())
            .then(items => {
                setPosts(items.constructions);
            })
    }, [])

    const handleSubmitFilter = () => {
        fetch(getFilterConstructions(host, 1, 10), {
            method: "PUT",
            headers: {
                'Content-type' : 'application/json',
                Accept : 'application/json'
            },
            body: JSON.stringify(filter)
        })
        .then(response => response.json())
        .then(items => {
            setPosts(items.constructions);
        })
    }

    const handleType = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, type: event.target.value}))
    }

    const handleMinCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, minCost: event.target.valueAsNumber}))
    }

    const handleMaxCost = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, maxCost: event.target.valueAsNumber}))
    }

    const handleCreatedAtUtc = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, createdAtUtcOrder: event.target.checked}))
    }

    const handleMinSquare = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, minSquare: event.target.valueAsNumber}))
    }

    const handleMaxSquare = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, maxSquare: event.target.valueAsNumber}))
    }

    const handleMinYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, minYear: event.target.valueAsNumber}))
    }

    const handleMaxYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(prev => ({...prev, maxYear: event.target.valueAsNumber}))
    }

    const [numberOfRoomsValue, setNumberOfRoomsValue] = useState<boolean>(false)
    const [disabledNumberOfRooms, setDisabledNumberOfRooms] = useState<boolean>(true)

    const handleNumberOfRoomsValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumberOfRoomsValue(event.target.checked)
        setDisabledNumberOfRooms(!disabledNumberOfRooms)
        setFilter(prev => ({...prev, numberOfRooms: null}))
    }

    const handleNumberOfRooms = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(numberOfRoomsValue){
            setFilter(prev => ({...prev, numberOfRooms: event.target.valueAsNumber}))
        }
    }

    const [floorValue, setFloorValue] = useState<boolean>(false)
    const [disabledFloor, setDisabledFloor] = useState<boolean>(true)

    const handleFloorValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFloorValue(event.target.checked)
        setDisabledFloor(!disabledFloor)
        setFilter(prev => ({...prev, floor: null}))
    }

    const handleFloor = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(floorValue){
            setFilter(prev => ({...prev, floor: event.target.valueAsNumber}))
        }
    }

    return (
        <div style={{height: '100%', display: 'flex'}}>
            <div style={{width: '30%', position: 'fixed', marginTop: '10px', marginLeft: '20px'}}>
            <FormControl sx={{ml: 2}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Стоимость</FormLabel>
                <Box sx={{pt: 2, pb: 2}}>
                    <TextField
                        inputProps={{ type: 'number', min: 0, max: 9999}}
                        sx={{mr: 2, width: '180px'}}
                        label="Минимальная стоимость"
                        id="outlined-size-small"
                        value={filter.minCost}
                        onChange={handleMinCost}
                        size="small"/>
                    <TextField
                    sx={{width: '180px'}}
                        inputProps={{ type: 'number', min: 1, max: 10000}}
                        label="Максимальная стоимость"
                        id="outlined-size-small"
                        value={filter.maxCost}
                        onChange={handleMaxCost}
                        size="small"/>
                </Box>

                <FormLabel id="demo-row-radio-buttons-group-label">Отсортировать по дате</FormLabel>
                <Switch
                    checked={filter.createdAtUtcOrder}
                    onChange={handleCreatedAtUtc}
                    inputProps={{ 'aria-label': 'controlled' }}
                />

                <FormLabel id="demo-row-radio-buttons-group-label">Тип</FormLabel>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        defaultValue="female"
                        name="row-radio-buttons-group"
                        value={filter.type}
                        onChange={handleType}
                    >
                        <FormControlLabel
                            value="" 
                            control={<Radio />} 
                            label="Все" />

                        <FormControlLabel 
                            value="Room" 
                            control={<Radio />} 
                            label="Комната" />

                        <FormControlLabel 
                            value="Apartment" 
                            control={<Radio />} 
                            label="Квартира" />

                        <FormControlLabel 
                            value="House" 
                            control={<Radio />} 
                            label="Дом" />
                    </RadioGroup>

                <FormLabel id="demo-row-radio-buttons-group-label">Площадь помещения</FormLabel>
                <Box sx={{pt: 2, pb: 2}}>
                    <TextField
                        inputProps={{ type: 'number', min: 0, max: 9999}}
                        sx={{mr: 2, width: '180px'}}
                        label="Минимальная площадь"
                        id="outlined-size-small"
                        value={filter.minSquare}
                        onChange={handleMinSquare}
                        size="small"/>
                    <TextField
                        inputProps={{ type: 'number', min: 1, max: 10000}}
                        sx={{width: '180px'}}
                        label="Максимальная площадь"
                        id="outlined-size-small"
                        value={filter.maxSquare}
                        onChange={handleMaxSquare}
                        size="small"/>
                </Box>

                <FormLabel id="demo-row-radio-buttons-group-label">Год постройки</FormLabel>
                <Box sx={{pt: 2, pb: 2}}>
                    <TextField
                        inputProps={{ type: 'number', min: 1000, max: 2022}}
                        sx={{mr: 2, width: '180px'}}
                        label="Минимальный год"
                        id="outlined-size-small"
                        value={filter.minYear}
                        onChange={handleMinYear}
                        size="small"/>
                    <TextField
                        inputProps={{ type: 'number', min: 1001, max: 2023}}
                        sx={{width: '180px'}}
                        label="Максимальный год"
                        id="outlined-size-small"
                        value={filter.maxYear}
                        onChange={handleMaxYear}
                        size="small"/>
                </Box>

                <FormLabel id="demo-row-radio-buttons-group-label">Количество комнат</FormLabel>
                <Box sx={{pt: 2, pb: 2}}>
                    <TextField
                        inputProps={{ type: 'number', min: 1, max: 10}}
                        sx={{mr: 2, width: '180px'}}
                        id="outlined-size-small"
                        value={filter.numberOfRooms}
                        onChange={handleNumberOfRooms}
                        disabled={disabledNumberOfRooms}
                        size="small"/>
                        Учитывать: 
                        <Checkbox
                            checked={numberOfRoomsValue}
                            onChange={handleNumberOfRoomsValue}
                            inputProps={{ 'aria-label': 'controlled' }}/>
                </Box>

                <FormLabel id="demo-row-radio-buttons-group-label">Этаж</FormLabel>
                <Box sx={{pt: 2, pb: 2}}>
                    <TextField
                        inputProps={{ type: 'number', min: 0, max: 200}}
                        sx={{mr: 2, width: '180px'}}
                        id="outlined-size-small"
                        value={filter.floor}
                        onChange={handleFloor}
                        disabled={disabledFloor}
                        size="small"/>
                        Учитывать: 
                        <Checkbox
                            checked={floorValue}
                            onChange={handleFloorValue}
                            inputProps={{ 'aria-label': 'controlled' }}/>
                </Box>
                <Button variant="contained" onClick={handleSubmitFilter}>Отфильтровать</Button>
            </FormControl>
            
            </div>
            <div style={{width: '30%', marginLeft: '30%'}}>
                <Posts posts={posts} />
            </div>
            <div style={{width: '30%'}}>
                
            </div>
        </div>  
    )
}

export default Catalog