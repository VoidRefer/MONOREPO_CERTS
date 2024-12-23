const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    let test_id; //Variable to store generated test ID for the tests.
  
    suite("POST /api/issues/{project}", function () {
        test("Create an issue with every field", function (done) {
            chai.request(server)
                .post("/api/issues/apitest")
                .send({
                    issue_title: "Test title",
                    issue_text: "Test text",
                    created_by: "Tester",
                    assigned_to: "assign",
                    status_text: "Progress"
                })
                .end(function(err, res)  {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.issue_title, "Test title");
                    assert.equal(res.body.issue_text, "Test text");
                    assert.equal(res.body.created_by, "Tester");
                    assert.equal(res.body.assigned_to, "assign");
                    assert.equal(res.body.status_text, "Progress");
                    assert.isDefined(res.body._id);
                    test_id = res.body._id;
                    done();
                });
        });

        test("Create an issue with only required fields", function (done) {
            chai.request(server)
                .post("/api/issues/apitest")
                .send({
                    issue_title: "Test title",
                    issue_text: "Test text",
                    created_by: "Tester"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.issue_title, "Test title");
                    assert.equal(res.body.issue_text, "Test text");
                    assert.equal(res.body.created_by, "Tester");
                    assert.equal(res.body.assigned_to, "");
                    assert.equal(res.body.status_text, "");
                    assert.isDefined(res.body._id);
                    done();
                });

        });

        test("Create an issue with missing required fields", function (done) {
            chai.request(server)
                .post("/api/issues/apitest")
                .send({
                    issue_title: "missing"
                })
                .end((err, res) => {
                    assert.equal(res.status, 200)
                    assert.deepEqual(res.body, { error: "required field(s) missing" });
                    done();
                });
        });
    });

    suite("GET /api/issues/{project}", function () {
        test("View issues on a project", function (done) {
            chai.request(server)
                .get("/api/issues/apitest")
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    assert.property(res.body[0], "issue_title");
                    assert.property(res.body[0], "issue_text");
                    assert.property(res.body[0], "created_by");
                    done();
                });
        });

        test("View issues on a project with one filter", function (done) {
            const filterKey = "open";
            const filterValue = true;

            chai.request(server)
                .get("/api/issues/apitest")
                .query( { filterKey : filterValue  } ) //dynamic key-value for the query
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    res.body.forEach(issue => {
                        assert.equal(issue[filterKey], filterValue);
                    });
                    done();
                });
            
        })

        test("View issues on a project with multiple filters", function (done) {
            filters = {
                open: true,
                created_by: "Tester"
            }; //Dynamic filters

            chai.request(server)
                .get("/api/issues/apitest")
                .query( filters )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.isArray(res.body);
                    res.body.forEach( issue => {
                        for (const [key, value] of Object.entries(filters)) {
                            assert.equal(issue[key], value);
                        }
                    });
                    done();
                });
        });
    });

    suite("PUT /api/issues/{project}", function () {
        test("Update one field on an issue", function (done) {
            chai.request(server)
                .put("/api/issues/apitest")
                .send( {_id: test_id, issue_title: "Updated title"} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { result: 'successfully updated', '_id': test_id });
                    done();
                });
        });

        test("Update multiple fields on an issue", function (done) {
            chai.request(server)
                .put("/api/issues/apitest")
                .send( {_id: test_id, issue_title: "Updated title", open: false} )
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { result: 'successfully updated', '_id': test_id });
                    done();
                });
        });

        test("Update an issue with missing _id", function (done) {
            chai.request(server)
            .put("/api/issues/apitest")
            .send( { issue_title: "Missing ID" } )
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'missing _id' });
                done();
            });
        });

        test("Update an issue with no fields to update", function (done) {
            chai.request(server)
            .put("/api/issues/apitest")
            .send( { _id: test_id  } )
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'no update field(s) sent', '_id': test_id });
                done();
            });
        });

        test("Update an issue with an invalid _id", function (done) {
            let invalid_id = "invalid_id";

            chai.request(server)
            .put("/api/issues/apitest")
            .send( { _id:  invalid_id, issue_title: "Updated title", open: false } )
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.deepEqual(res.body, { error: 'could not update', '_id': invalid_id } );
                done();
            });
        });
    })

    suite("DELETE /api/issues/{project}", function () {
        test("Delete an issue", function (done) {
            chai.request(server)
                .delete("/api/issues/apitest")
                .send( { _id: test_id })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { result: 'successfully deleted', '_id': test_id });
                    done();
                });
        });

        test("Delete an issue with an invalid _id", function (done) {
            let invalid_id = "invalid_id";

            chai.request(server)
                .delete("/api/issues/apitest")
                .send( { _id: invalid_id })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'could not delete', '_id': invalid_id });
                    done();
                });
        });

        test("Delete an issue with missing _id", function (done) {
            chai.request(server)
                .delete("/api/issues/apitest")
                .send( { })
                .end((err, res) => {
                    assert.equal(res.status, 200);
                    assert.deepEqual(res.body, { error: 'missing _id' } );
                    done();
                });
        })
    })
});
