import { prompt } from "inquirer";
import initiator from "./initiator";
import { path } from "./config";

async function initTemplate() {
  const questions = [
    {
      type: "input",
      name: "project",
      message: "项目名称:",
      default: (lastAnswer) => {
        return lastAnswer.tplName;
      },
    },
  ];

  prompt(questions).then(async ({ project }) => {
    const pwd = process.cwd();
    initiator({ from: path.from, dist: `${pwd}/${project}` });
  });
}

export default initTemplate;
