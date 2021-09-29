/*
 * @Description:
 * @Version: 2.0
 * @Autor: Shawnneosuen@outlook.com
 * @Date: 2021-09-30 02:20:41
 * @LastEditors: Shawnneosuen@outlook.com
 * @LastEditTime: 2021-09-30 02:22:15
 */
export interface Command {
  Id: string;
  Name: string;
  action: Function;
}
