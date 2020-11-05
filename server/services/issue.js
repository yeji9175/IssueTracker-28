const db = require('./db/issue');

const getLabels = async (data) => {
  const labels = await data.getLabels();
  const result = [];
  labels.forEach((label) => {
    const temp = {};
    temp.name = label.name;
    temp.color = label.color;
    result.push(temp);
  });
  return result;
};

const getAssignees = async (data) => {
  const assignees = await data.getUsers();
  const result = [];

  assignees.forEach((assignee) => {
    result.push(assignee.userId);
  });

  return result;
};

exports.getIssues = async () => {
  const results = await db.selectIssue();
  const data = [];

  for (const result of results) {
    const issue = {};
    issue.id = result.id;
    issue.title = result.title;
    issue.content = result.content;
    issue.author = result.user.dataValues.user_id;
    if (result.milestone) issue.milestone = result.milestone.dataValues.title;
    else issue.milestone = null;
    if (result.status === 0) issue.status = 'opened';
    else issue.status = 'closed';
    issue.labels = await getLabels(result);
    issue.assignees = await getAssignees(result);
    issue.time = result.dataValues.updated_at;

    data.push(issue);
  }

  return data;
};

exports.createIssue = async (params) => {
  const results = await db.insertIssue(params);
  return results;
};

exports.createIssueAssignees = async (params) => {
  const results = await Promise.all(
    params.assignees.map((assignee) => {
      return db.insertIssueAssignee({ ...params, assignees: assignee });
    })
  );
  return results;
};
exports.createIssueLabels = async (params) => {
  const results = await Promise.all(
    params.labels.map((label) => {
      return db.insertIssueLabel({ ...params, labels: label });
    })
  );
  return results;
};


exports.updateIssueStatus = async (ids, status) => {
  const results = await db.updateIssueStatus(ids, status);
  return results;
};