const fs = require('fs');
const path = require('path');
let c=process.argv.slice(2);
console.log(c);
let command= c[0]
if(command=="tree"){
    tree(c[1]);
}
if(command=="organize"){
    organize(c[1])
}
if(command=="help"){
    help(c[1])
}

function tree(x){
    if(x==undefined){
        treeHelper(process.cwd(),"");``
        return;
    }
    else{
        let doesExist=fs.existsSync(x);
        if(doesExist){
            treeHelper(x,"");
        }
        else{
            console.log("galat path");
            return;
        }
    }
}
function help(x){
    console.log("all commmands are:- ",x);
}
function organize(x){
    let dPath;
    if(x== undefined){
        console.log("pass something bro!")
    }else{
        let doesExist=fs.existsSync(x);
        if(doesExist){
            dPath=path.join(x, "organized_files");
            if(fs.mkdirSync(dPath)==false) {fs.mkdirSync(dPath)}
            else{
                console.log("done")
            }
        }
        else{
            console.log("enter write path")
            return; 
        }
    }
    og(x,dPath);
}
function og(src,dest){
    let childs=fs.readdirSync(src);
    for(let i=0;i<childs.length;i++){
        let ca=path.join(src,childs[i]);
        let isFile=fs.existsSync(ca);
        if(isFile){
            let ext= path.extname(childs[i]).slice(1);
            console.log(ext)
            setFiles(ca, dest, ext);
        }
    }
}
//dest->organized_files path
//src-> files path
//category-> extension
function setFiles(src, dest, category){
    let caPath=path.join(dest,category);
    if(fs.existsSync(caPath)==false){
        fs.mkdirSync(caPath);
    }
    //capath-> organized_files ->ext path
    let filename=path.basename(src);
    let destFile=path.join(caPath,filename);
    fs.copyFileSync(src,destFile);
    fs.unlinkSync(src);
    console.log("File moved to ",category);
}

function treeHelper(x,indent){
    let isFile= fs.lstatSync(x).isFile();
    if(isFile){
        let file=path.basename(x);
        console.log(indent + "|-"+file);
    }else{
        let dirpath=path.basename(x);
        console.log(indent+"-|"+dirpath);
        let childrens=fs.readdirSync(x);
        for(let i=0;i<childrens.length;i++){
            let ca=path.join(x,childrens[i]);
            treeHelper(ca,indent+"\t");
        }
    }
}