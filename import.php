<?php
        require_once 'vtlib/Vtiger/Module.php';
        require_once 'vtlib/Vtiger/Package.php';

        $Vtiger_Utils_Log = true;

        $package = new Vtiger_Package();
        $package->import('VTigerPremium.zip');
        // File was compressed and put to anywhere

