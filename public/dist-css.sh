rm -rf stylesheets/
mkdir stylesheets
sass --style compressed style/map.scss stylesheets/map.css
sass --style compressed style/activity.scss stylesheets/activity.css
sass --style compressed style/error.scss stylesheets/error.css
