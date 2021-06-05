const BookModel = require("../models/book");
const IssueModel = require("../models/issue");
const MemberModel = require("../models/member");
const greenColor = "\x1b[32m";
const resetColor = "\x1b[0m";

const printAllIssues = async () => {
  let issuesList = await IssueModel.find({ isOpen: true })
    .populate("bookRef")
    .populate("memberRef");
  if (issuesList.length === 0) {
    console.log(greenColor + "\nThere are no active issues" + resetColor);
    return;
  }
  console.log(greenColor + "=============================================" + resetColor);
  issuesList.forEach((issue) => {
    console.log(
      greenColor +
        ` ${issue.bookRef.title} | ${issue.memberRef.name} | isOpen: ${issue.isOpen} \n=============================================` +
        resetColor
    );
  });
};
const addAnIssue = async (memberId, bookName) => {
  let memberObjectRef, bookObjectRef;
  let memberObjectFound = false;
  let bookObjectFound = false;
  await BookModel.findOne({ title: bookName })
    .then((data) => {
      if (!data || data.length === 0) {
        console.log(
          greenColor +
            "\nEntered book name is not found in the book list" +
            resetColor
        );
      } else {
        bookObjectRef = data._id;
        bookObjectFound = true;
      }
    })
    .catch((err) => console.log(err));
  if (!bookObjectFound) return;
  await MemberModel.findOne({ memberID: memberId })
    .then((data) => {
      if (!data || data.length === 0) {
        console.log(
          greenColor +
            "\nEntered member id does not exist in our database. Please recheck your member ID." +
            resetColor
        );
      } else {
        memberObjectRef = data._id;
        memberObjectFound = true;
      }
    })
    .catch((err) => console.log(err));
  if (!memberObjectFound) return;
  let bookAvailable = true;
  await IssueModel.find()
    .and([{ bookRef: bookObjectRef }, { isOpen: true }])
    .then((data) => {
      if (data && data.length > 0) {
        console.log(
          greenColor +
            "\nThe book has already been issued to another member. Please wait for a week and try again." +
            resetColor
        );
        bookAvailable = false;
      }
    });
  if (!bookAvailable) return;
    await IssueModel.find({ memberRef: memberObjectRef })
        .then(async (data) => {
            if (data && data.length > 0 && data[0].isOpen === true) {
                console.log(
                    greenColor +
                    `\nThis member has been issued a book already. New book cannot be issued until he/she returns the other book.` +
                    resetColor
                );
                bookAvailable = false;
            } else if (data && data.length > 0 && data[0].isOpen === false) {
                await IssueModel.findOneAndUpdate(
                    { memberRef: memberObjectRef },
                    { $set: { isOpen: true } },
                    { new: true }
                  )
                    .populate("bookRef")
                    .populate("memberRef")
                    .then((newdata) =>
                      console.log(
                        greenColor +
                          `\nData has been updated successfully. Here is the updated info: \n${newdata.bookRef.title} | ${newdata.memberRef.name} | isOpen: ${newdata.isOpen} \n` +
                          resetColor
                      )
                    )
                    .catch((err) => console.log(err));
            } else {
                  await new IssueModel({
                    bookRef: bookObjectRef,
                    memberRef: memberObjectRef,
                    isOpen: true,
                  })
                    .save()
                    .then((data) => {
                      console.log(
                        greenColor + "\nIssue is recorded to the database" + data + resetColor
                      );
                    })
                    .catch((err) => console.log(err));
                
            }
        });

};
const deleteUsingMemberID = async (memberID) => {
  let memberRef;
  await MemberModel.find({ memberID: memberID }).then((data) => {
    if (!data || data.length === 0) {
      console.log(greenColor + "\nInvalid memberID." + resetColor);
      return;
    } else {
      memberRef = data[0]["_id"];
    }
  });
  await IssueModel.find({ memberRef: memberRef }).then(async (data) => {
    if (!data || data.length === 0) {
      console.log(
        greenColor +
          "\nThere is no issue associated with the entered member ID." +
          resetColor
      );
    } else if (data[0].isOpen === false) {
      console.log(
        greenColor +
          "\nThis member currently has no active issue to close" +
          resetColor
      );
    } else {
      await IssueModel.findOneAndUpdate(
        { memberRef: memberRef },
        { $set: { isOpen: false } },
        { new: true }
      )
        .populate("bookRef")
        .populate("memberRef")
        .then((newdata) =>
          console.log(
            greenColor +
              `\nData has been updated successfully. Here is the updated info: \n${newdata.bookRef.title} | ${newdata.memberRef.name} | isOpen: ${newdata.isOpen} \n` +
              resetColor
          )
        )
        .catch((err) => console.log(err));
    }
  });
};

module.exports = { addAnIssue, printAllIssues, deleteUsingMemberID };
