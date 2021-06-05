const MemberModel = require("../models/member");
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

const printAllMembers = async () => {
  let members = await MemberModel.find({});
  if (members.length === 0) {
    console.log(greenColor + "\nThere are no members added yet" + resetColor);
    return;
  }
  console.log(greenColor + "========================" + resetColor);
  members.forEach((member) =>
    console.log(
      greenColor +
        `\nName: ${member.name} \nMember ID: ${member.memberID}\n========================` +
        resetColor
    )
  );
};
const addAMember = async (memberName) => {
  await new MemberModel({ name: memberName })
    .save()
    .then((data) =>
      console.log(
        greenColor +
          `\nMember ${data.name} is added successfully and assigned with ID: ${data.memberID}` +
          resetColor
      )
    )
    .catch((err) => console.log(err));
};
const deleteAMember = async (memberID) => {
  let itemToDelete = await MemberModel.findOne({ memberID: memberID });
  if (itemToDelete === null) {
    console.log(greenColor + "\nMember does not exist!" + resetColor);
  } else {
    await itemToDelete
      .remove()
      .then(() =>
        console.log(
          greenColor + `\nMember ${memberID} removed successfully` + resetColor
        )
      )
      .catch((err) => console.log(err));
  }
};
module.exports = { addAMember, printAllMembers, deleteAMember };
