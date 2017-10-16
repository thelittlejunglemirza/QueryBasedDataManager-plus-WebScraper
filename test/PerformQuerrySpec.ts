import InsightFacade from "../src/controller/InsightFacade"
import {InsightResponse} from "../src/controller/IInsightFacade";
import {expect} from 'chai';
import Log from "../src/Util";



describe("PerformQuerrySpec", function () {

    let fs = require('fs');

    /*let rimraf = require('rimraf');
    rimraf('./Data_Set', function () {
        console.log('Data_Set reset.')
    });
    */

    var insightFacade: InsightFacade = null;
    beforeEach(function () {
        insightFacade = new InsightFacade;

    });

    afterEach(function () {
        insightFacade = null;
    });

    let data = fs.readFileSync('test/querry.txt');
    let obj = JSON.parse(data);
    let data2 = fs.readFileSync('test/querry2.txt');
    let obj2 = JSON.parse(data2);

    let data3_1 = fs.readFileSync('test/querry3.txt');
    let obj3_1 = JSON.parse(data3_1);

    let data3 = fs.readFileSync('test/query3.txt');
    let obj3 = JSON.parse(data3);
    let data4 = fs.readFileSync('test/query4.txt');
    let obj4 = JSON.parse(data4);
    let data5 = fs.readFileSync('test/query5.txt');
    let obj5 = JSON.parse(data5);
    let data6 = fs.readFileSync('test/query6.txt');
    let obj6 = JSON.parse(data6);
    let data7 = fs.readFileSync('test/query7.txt');
    let obj7 = JSON.parse(data7);
    let data8 = fs.readFileSync('test/query8.txt');
    let obj8 = JSON.parse(data8);
    let data9 = fs.readFileSync('test/query9.txt');
    let obj9 = JSON.parse(data9);
    let data10 = fs.readFileSync('test/query10.txt');
    let obj10 = JSON.parse(data10);
    let data11 = fs.readFileSync('test/query11.txt');
    let obj11 = JSON.parse(data11);
    let data12 = fs.readFileSync('test/query12.txt');
    let obj12 = JSON.parse(data12);
    let data13 = fs.readFileSync('test/query13.txt');
    let obj13 = JSON.parse(data13);
    let data14 = fs.readFileSync('test/query14.txt');
    let obj14 = JSON.parse(data14);
    let data15 = fs.readFileSync('test/query15.txt');
    let obj15 = JSON.parse(data15);
    let data16 = fs.readFileSync('test/query16.txt');
    let obj16 = JSON.parse(data16);






    it("test if perform query gets to WHERE" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj).then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error body: " + insightResponse.code);
            expect.fail();
        })

    });
    it("test if perform query gets to WHERE second time" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj2).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


    it("test if perform query all courses with same department" , function () {
        this.timeout(10000);
        return insightFacade.performQuery(obj3_1).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });


    it("Empty AND returns an error code of 400." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj3).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Empty OR returns an error code of 400." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj4).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });


    it("Find all sections for a department or any class taught by an instructor. (Testing Wildcards in IS)" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj5).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections of a (single) wildcard course_id." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj6).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });



    it("Find all sections for an instructor." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj7).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Find all sections for a department." , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj8).then(function(insightResponse: InsightResponse){
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous Query Logic" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj9).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj10).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj11).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj12).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("test if perform query to check for a set of specific instructor" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj13).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous Query Key, Invalid Order" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj14).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Empty Columns" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj15).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid Options" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj16).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("test if perform query to check for EQ" , function () {
        this.timeout(10000);
        let data17 = fs.readFileSync('test/query17.txt');
        let obj17 = JSON.parse(data17);
        return insightFacade.performQuery(obj17).then(function(insightResponse: InsightResponse){
            //Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(200);
        }).catch(function (insightResponse: InsightResponse) {
            //console.log("in catch:");
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });
    it("Erroneous Query Key, bad EQ" , function () {
        this.timeout(10000);
        let data18 = fs.readFileSync('test/query18.txt');
        let obj18 = JSON.parse(data18);
        return insightFacade.performQuery(obj18).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });

    it("Erroneous Query Key, Invalid Options" , function () {
        this.timeout(10000);
        let data19 = fs.readFileSync('test/query19.txt');
        let obj19 = JSON.parse(data19);
        return insightFacade.performQuery(obj19).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(400);
        })

    });
    it ("removing a dataset" , function () {
        this.timeout(20000);
        return insightFacade.removeDataset("courses").then(function(insightResponse: InsightResponse){
            Log.test('Code: ' + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(204);
        }).catch(function (insightResponse: InsightResponse) {
            console.log("in catch:");
            console.log("the promise returned by addDataSet rejected by the error code: " + insightResponse.code);
            expect.fail();
        })

    });

    it("Erroneous PQ, nodataset" , function () {
        this.timeout(10000);

        return insightFacade.performQuery(obj15).then(function(insightResponse: InsightResponse){
            expect.fail();
        }).catch(function (insightResponse: InsightResponse) {
            console.log("the promise returned by PQ rejected by the error code: " + insightResponse.code);
            expect(insightResponse.code).to.deep.equal(424);
        })

    });
});