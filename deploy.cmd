:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
:: Deployment
:: ----------

:Deployment
echo Handling node.js deployment.

:: 1. Select node version
call :SelectNodeVersion

:: 2. Install npm packages
IF EXIST "%DEPLOYMENT_SOURCE%\package.json" (
  pushd "%DEPLOYMENT_SOURCE%"
  call :ExecuteCmd !NPM_CMD! install --production
  IF !ERRORLEVEL! NEQ 0 goto error
  popd
)

:: 3. Angular Prod Build
IF EXIST "%DEPLOYMENT_SOURCE%/.angular-cli.json" (
echo Building App in %DEPLOYMENT_SOURCE%…
pushd "%DEPLOYMENT_SOURCE%"
call :ExecuteCmd !NPM_CMD! run build
:: If the above command fails comment above and uncomment below one
:: call ./node_modules/.bin/ng build –prod
IF !ERRORLEVEL! NEQ 0 goto error
popd
)

:: 4. KuduSync
IF /I "%IN_PLACE_DEPLOYMENT%" NEQ "1" (
  call :ExecuteCmd "%KUDU_SYNC_CMD%" -v 50 -f "%DEPLOYMENT_SOURCE%/dist" -t "%DEPLOYMENT_TARGET%" -n "%NEXT_MANIFEST_PATH%" -p "%PREVIOUS_MANIFEST_PATH%" -i ".git;.hg;.deployment;deploy.cmd"
  IF !ERRORLEVEL! NEQ 0 goto error
)