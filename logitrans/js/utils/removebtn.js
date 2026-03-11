export function removeBtn(arr){
arr.forEach(arrItem=>{
            let moreBtn = arrItem.querySelector('.read-more');
            if(moreBtn){
                moreBtn.remove();
            }
        })
}