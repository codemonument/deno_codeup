/**
 * Example API Path
 * https://update.code.visualstudio.com/api/update/win32-x64-archive/stable/productCommit
 *
 * Example Response:
 * // 20211215145345
   // https://update.code.visualstudio.com/api/update/win32-x64-archive/stable/productCommit
 * {
 *   "url": "https://az764295.vo.msecnd.net/stable/fe719cd3e5825bf14e14182fddeb88ee8daf044f/VSCode-win32-x64-1.63.1.zip",
 *   "name": "1.63.1",
 *   "version": "fe719cd3e5825bf14e14182fddeb88ee8daf044f",
 *   "productVersion": "1.63.1",
 *   "hash": "2747b67aa2189a4b62038728127b98831a90af57",
 *   "timestamp": 1639448011023,
 *   "sha256hash": "bade46e6c2cc93166164aae66410d04eb4d97536f0fbfd409ea799a6b974e615",
 *   "supportsFastUpdate": true
 * }
 */
export interface VSCodeProductResponse () {
    
    // contains download path for zip, or some form of installer
    url: String;

    // contains version number as string
    name: String;

    // git commit hash
    version: String;

    // also contains version number as string
    productVersion: String;

    // probably the hash of the file from this.url
    hash: String;

    // probably the unix timestamp
    timestamp: String;

    sha256hash: String;

    // use unknown
    supportsFastUpdate: Boolean;
}