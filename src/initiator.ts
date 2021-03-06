import { Download, DownloadResult } from "./types";
import chalk from "chalk";
import ora from "ora";

const download = require("download-git-repo");
const spinner = ora("Downloading template...");

const doDownload = (from: string, dist: string): Promise<DownloadResult> => {
  console.log(from, dist);
  spinner.start();
  return new Promise((resolve, reject) => {
    download(from, dist, { clone: true }, (err) => {
      if (err) {
        reject({
          status: 0,
          msg: err,
        });
      }
      spinner.stop();
      resolve({
        status: 1,
        msg: `New project has been initialized successfully! Locate in \n${dist}`,
      });
    });
  });
};

const initiator = async ({
  path = "",
  branch = "",
  from = "",
  dist = "",
}: Partial<Download>) => {
  let dlFrom = "";
  let result: DownloadResult;
  if (from === "GitHub" || from === "GitLab" || from === "Bitbucket") {
    dlFrom = from.toLocaleLowerCase() + ":" + path + "#" + branch;
    result = await doDownload(dlFrom, dist);
  } else if (from.startsWith("http")) {
    dlFrom = "direct:" + from;
    result = await doDownload(dlFrom, dist);
  }

  console.log(result.status ? chalk.green(result.msg) : chalk.red(result.msg));
};

export default initiator;
