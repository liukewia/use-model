if (require('fs').existsSync(require('path').join(__dirname, '../git-hooks'))) {
  require('../git-hooks/yorkie');
}
