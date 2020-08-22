BOT_URL="https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage"

PARSE_MODE="HTML"

send_msg() {
  curl -s -X POST ${BOT_URL} -d chat_id=$TELEGRAM_CHAT_ID \
  -d text="$1" -d parse_mode=${PARSE_MODE}
}

send_msg "
-------------------------------------
Repository:  https://github.com/${TRAVIS_REPO_SLUG}
Heroku:  ${HEROKU_URL}

Commit Msg:
${TRAVIS_COMMIT_MESSAGE}

[Job Log here](${TRAVIS_JOB_WEB_URL})
--------------------------------------
"
