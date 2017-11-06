

import {Building, Room} from "../AST/Building";
import GeoFacade from "./GeoFacade";
import {GeoResponse} from "./IGeoFacade";
export default class FileOperator{
    public c = 0;
    private fs = require('fs');

    // create the directory if it doesnt already exist
    makeDirectory(str: string){
        if (!this.fs.existsSync(str)) {
            this.fs.mkdirSync(str)
        }
    }

    // read and write the dataset
    readAndWrite(txtArr: Array<string>, id:string){    //!!!!!
        if(id === "courses"){
            this.readAndWriteCourses(txtArr, id);
        }else if(id === "rooms"){
            this.readAndWriteRooms(txtArr, id);
        }
        else{
            this.readAndWriteCourses(txtArr, id);
        }
    }

    // read the files from courses and write to JSON file
    readAndWriteCourses(txtArr: Array<string>, id: string){
        let flagFoundCourse = false;
        this.fs.writeFileSync("Data_Set/MyDatasetInsight"+id+".json", '[' + '\n');
        let sep = "";
        for (let i of txtArr) {
            if (this.isJsonString(i)) {
                let obj = JSON.parse(i);
                obj = obj['result'];
                if(flagFoundCourse == false && obj.length > 0){
                    flagFoundCourse = true;
                }
                for (let j of obj) {
                    let course_year: number;
                    if(j["Section"] === "overall"){
                        course_year = 1900;
                    }else{
                        course_year = parseInt(j["Year"]);
                    }
                    let dict = {
                        "courses_dept": j['Subject'],
                        "courses_id": j['Course'],
                        "courses_avg": j['Avg'],
                        "courses_instructor": j['Professor'],
                        "courses_title": j['Title'],
                        "courses_pass": j['Pass'],
                        "courses_fail": j['Fail'],
                        "courses_audit": j['Audit'],
                        "courses_uuid": j['id'].toString(),
                        "courses_year": course_year
                    };
                    let dictstring = JSON.stringify(dict);

                    this.fs.appendFileSync("Data_Set/MyDatasetInsight"+id+".json", sep + dictstring);
                    if (!sep){
                        sep = ',\n'
                    }
                }
            }
        }
        this.fs.appendFileSync("Data_Set/MyDatasetInsight"+id+".json", '\n]');
        if(flagFoundCourse == false){
            this.fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
            throw "the dataset is not valid";
        }
    }

    getIndexTable(child: any): NodeList{
        if(child.nodeName === "tbody"){
            return child.childNodes;
        }else{
            if(!(child.childNodes)){
                return null;
            }
            for(let i of child.childNodes){
                let ret = this.getIndexTable(i);
                if(ret){
                    return ret;
                }
            }
        }
        return null;
    }

    fetchBuildings(table: any): Array<Building>{
        let buildings: Array<Building> =[];

        for(let r of table){
            if(r.nodeName === "tr"){
                let row = r;
                let bldg = new Building;
                bldg.shortname = row.childNodes[3].childNodes[0].value.trim();
                bldg.fullname = row.childNodes[5].childNodes[1].childNodes[0].value.trim();
                bldg.address = row.childNodes[7].childNodes[0].value.trim();
                buildings.push(bldg);

            }
        }
        return buildings;
    }

    isInBuildings(document: any, fullnames: Array<string>): boolean{
        for(let f of fullnames){
            if(document.value === f){
                return true;
            }
        }
        return false;
    }

    getBuilding(document: any, fullnames: Array<string>):string{
        if(document.nodeName === "div"){
            for(let a of document.attrs){
                if(a.value === "building-info" && this.isInBuildings(document.childNodes[1].childNodes[0].childNodes[0],fullnames)){
                    let bldg:string = document.childNodes[1].childNodes[0].childNodes[0].value;
                    return bldg;
                }
            }

       }
       if(document.childNodes){
           for(let c of document.childNodes){
               let ret = this.getBuilding(c, fullnames);
               if(ret){
                   return ret;
               }
           }
       }
       return null;
    }

    addRooms(document: any, buildings: Array<Building>, bldg: string){
        let table:any = this.getIndexTable(document);
        if(table == null){
            return;
        }
        for(let r of table){
            if(r.nodeName === "tr"){
                let row = r;
                let room = new Room;
                room.room_number = row.childNodes[1].childNodes[1].childNodes[0].value.trim();
                room.room_seats = parseInt(row.childNodes[3].childNodes[0].value.trim());
                room.room_furniture = row.childNodes[5].childNodes[0].value.trim();
                room.room_type = row.childNodes[7].childNodes[0].value.trim();
                room.room_href = row.childNodes[9].childNodes[1].attrs[0].value;

                for(let b of buildings){
                    if(b.fullname === bldg){
                        room.room_name = b.shortname + "_" + room.room_number;
                        b.addRoom(room);
                        break;
                    }
                }
            }
        }
        return;
    }

    addToDataset(buildings: Array<Building>, id: string){
        let flagFoundRoom = false;
        this.fs.writeFileSync("Data_Set/MyRoomsInsight"+id+".json", '[' + '\n');
        let sep = "";
        for(let b of buildings){
            if(b.has_rooms){
                if(flagFoundRoom == false){
                    flagFoundRoom = true;
                }
                for(let r of b.rooms){
                    let geoFacade = new GeoFacade;
                    let geoResp: GeoResponse = geoFacade.getLatLon(r);
                    let lat = geoResp.lat;
                    let lon = geoResp.lon;
                    let dict = {
                        "rooms_fullname": b.fullname,
                        "rooms_shortname": b.shortname,
                        "rooms_number": r.room_number,
                        "rooms_name": r.room_name,
                        "rooms_address": b.address,
                        "rooms_lat": lat,
                        "rooms_lon": lon,
                        "rooms_seats": r.room_seats,
                        "rooms_type": r.room_type,
                        "rooms_furniture": r.room_furniture,
                        "rooms_href": r.room_href
                    };
                    let dictstring = JSON.stringify(dict);

                    this.fs.appendFileSync("Data_Set/MyRoomsInsight"+id+".json", sep + dictstring);
                    if (!sep){
                        sep = ',\n'
                    }
                }
            }
        }
        this.fs.appendFileSync("Data_Set/MyRoomsInsight"+id+".json", '\n]');
        if(flagFoundRoom == false){
            this.fs.unlinkSync("./Data_Set/MyRoomsInsight"+id+".json");
            throw "the dataset is not valid";
        }
    }

    readAndWriteRooms(txtArr: Array<string>, id: string){
        const parse5 = require('parse5');
        try{

            let index = parse5.parse(txtArr[txtArr.length - 1]);
            let table: any;
            for(let c of index.childNodes){
                table = this.getIndexTable(c);
                if(table){
                    break;
                }
            }
            let buildings: Array<Building> = this.fetchBuildings(table);

            let fullnames: Array<string> = [];
            for(let b of buildings){
                fullnames.push(b.fullname);
            }

            for(let f of txtArr) {
                let document = parse5.parse(f);
                let bldg = this.getBuilding(document, fullnames);
                if (bldg) {
                    this.addRooms(document, buildings, bldg);
                }
            }

            this.addToDataset(buildings, id);


        }catch (err){
            console.log(err);
            throw err;
        }

    }

    // check if string is JSON
    isJsonString(str: string): boolean{
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    // check if dataset exists return 201 if true 204 otherwise
    checkDatasetExists(id: string): number{
        if (this.fs.existsSync("Data_Set/MyDatasetInsight"+id+".json")) {
            this.fs.unlinkSync("./Data_Set/MyDatasetInsight"+id+".json");
            return 201;
        }else{
            return 204;
        }
    }

    // return the string associated with dataset if exists
    getDataset(id: string): string{
        if(id === "courses"){
            try{
                return this.fs.readFileSync("./Data_Set/MyDatasetInsightcourses.json");
            }catch(err) {
                throw "No Dataset"
            }
        }else if(id === "rooms"){
            try{
                return this.fs.readFileSync("./Data_Set/MyRoomsInsightrooms.json");
            }catch(err) {
                throw "No Dataset"
            }
        }
    }

    // write the result on a file called Query.json
    writeResultToFile(obj: { [key:string] : any}){
        const content = JSON.stringify(obj);
        this.fs.writeFile("test/Query.json", content, 'utf8', function (err: string) {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });

    }

}