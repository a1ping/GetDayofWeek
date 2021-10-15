const inDic = new Map<string, number>();
var outDic = new Map<string, number>();
var monthDays: number[] = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var dayNum: number[] = [0, 0, 0, 0, 0, 0, 0];
var dayName: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

initDic();
outDic = solution(inDic);
console.log(outDic);

function initDic():void
{
    inDic.set('2020-01-01',4);
    inDic.set('2020-01-02',4);
    inDic.set('2020-01-03',6);
    inDic.set('2020-01-04',8);
    inDic.set('2020-01-05',2);
    inDic.set('2020-01-06',-6);
    inDic.set('2020-01-07',2);
    inDic.set('2020-01-08',-2);
    // inDic.set('2020-01-01',6);
    // inDic.set('2020-01-04',12);
    // inDic.set('2020-01-05',14);
    // inDic.set('2020-01-06',2);
    // inDic.set('2020-01-07',4);
}

function solution(D: any): any
{
    let y:number, m:number, d:number;
    let yt:number, mt:number, dt:number;
    let wd:number, days:number, day: number;
    let entry:any;
    let i:number, j:number, k:number, n:number;
    const Dic = new Map<string, number>();
    [yt, mt, dt, wd] = getDateforToday();
    for(entry of D.entries())
    {
        [y, m, d]=getDateYMD(entry[0]);
        if(compareBigDate(y,m,d,yt,mt,dt))
        {
            days = getDateCount(y,m,d,yt,mt,dt);
            day = (wd+7-(days%7))%7;
        }
        else
        {
            days = getDateCount(yt,mt,dt,y,m,d);
            day = (wd+(days%7))%7;
        }
        dayNum[day]+=entry[1];
    }
    for(i=1;i<=7;i++)
    {
        j=i%7;
        if(dayNum[j]==0)
        {
            k=1;
            while(dayNum[j+k]==0)
            {
                k++;
            }
            let dv:number = (dayNum[j+k]-dayNum[j-1])/(k+1);
            for(n=j;n<j+k;n++)
            {
                dayNum[n]=dayNum[j-1]+dv*(n+1-j);
            }
        }
        Dic.set(dayName[j],dayNum[j]);
    }
    return Dic;
}

function compareBigDate(y1:number,m1:number,d1:number,y2:number,m2:number,d2:number):boolean
{
    if(y1<y2) return true;
    if(y1>y2) return false;
    if(m1<m2) return true;
    if(m1>m2) return false;
    if(d1<=d2) return true;else return false;
}

function getDateCount(y1:number,m1:number,d1:number,y2:number,m2:number,d2:number): number
{
    let y:number, m:number, d:number;
    let sm:number, tm:number, sd:number,td:number;
    d=0;
    sd=0;td=0;
    for(y=y1;y<=y2;y++)
    {
        if(y==y1) sm=m1;else sm=1;
        if(y==y2) tm=m2;else tm=12;
       for(m=sm;m<=tm;m++)
       {
           if(y==y1 && m==m1) sd=d1;else sd=1;
           if(y==y2 && m==m2) td=d2;else td=monthDays[m]+getYunYear(y,m);
           d+=(td-sd);
       }       
    }
    return d;
}

function getYunYear(y:number, m:number): number
{
    if(m!=2) return 0;
    if(y%400==0) return 1;
    if(y%100==0) return 0;
    if(y%4==0) return 1; else return 0;
}

function getDateforToday(): number[]
{
    let d:Date= new Date();
    let year:number= d.getFullYear();	//Get the year as a four digit number (yyyy)
    let month:number=d.getMonth()+1;	//Get the month as a number (0-11)
    let date:number=d.getDate();	//Get the day as a number (1-31)    
    let day:number=d.getDay();  //Get the weekday as a number (0-6)  
    return [year,month,date,day];
}

function getDateYMD(dstr:string):number[]
{
    let y, m, d, k:number;
    let str:string =dstr;
    k=str.indexOf('-');
    y=parseInt(str.substring(0,k));
    str=str.substring(k+1);
    k=str.indexOf('-');
    m=parseInt(str.substring(0,k));
    str=str.substring(k+1);
    d=parseInt(str);
    return [y, m, d];
}