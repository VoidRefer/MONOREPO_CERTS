'use strict';

const { v4: uuidv4 } = require("uuid");
const issuesDatabase = {};

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      let project = req.params.project;
      let query = req.query;

      const projectIssues = issuesDatabase[project] || [];
      const filteredIssues = projectIssues.filter(issue => {
        return Object.keys(query).every(key => issue[key] == query[key]);
      });

      res.json(filteredIssues);
    })
    
    .post(function (req, res){
      let project = req.params.project;
      
      const { issue_title, issue_text, created_by, assigned_to = "", status_text = "" } = req.body; 

      if (!issue_title || !issue_text || !created_by) return res.json( { error: "required field(s) missing" } );

      const newIssue = {
        _id: uuidv4(),
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on: new Date(),
        updated_on: new Date(),
        open: true
      }

      if (!issuesDatabase[project]) {
        issuesDatabase[project] = [];
      }
      issuesDatabase[project].push(newIssue);

      res.json(newIssue);

    })
    
    .put(function (req, res){
      let project = req.params.project;
      const {_id, ...updates} = req.body;

      if (!_id) return res.json( { error: 'missing _id' } );

      if (Object.keys(updates).length === 0) return res.json( { error: 'no update field(s) sent', '_id': _id } );

      const projectIssues = issuesDatabase[project] || [];
      const issue = projectIssues.find(issue => issue._id === _id);

      if (!issue) return res.json( { error: 'could not update', '_id': _id } );

      Object.keys(updates).forEach(key => {
        issue[key] = updates[key];
      })

      issue.updated_on = new Date();

      res.json( { result: 'successfully updated', '_id': _id } );
    })
    
    .delete(function (req, res){
      let project = req.params.project;
      const { _id } = req.body;

      if (!_id) return res.json( { error: 'missing _id' } );

      const projectIssues = issuesDatabase[project] || [];
      const issueIndex = projectIssues.findIndex(issue => issue._id === _id);

      if (issueIndex === -1) return res.json( { error: 'could not delete', '_id': _id } );

      projectIssues.splice( issueIndex, 1);

      res.json( { result: 'successfully deleted', '_id': _id } );
      
    });
    
};
