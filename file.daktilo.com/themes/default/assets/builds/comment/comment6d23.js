var tmpCbPost=null;var comment={action:false,robotOn:false,mobil:false,form:false,id:false,replyid:false,storge:{open:false,isim:false,mail:false,yorum:{}}};$(document).ready(function(){c_action();c_mobile();c_likes();c_dislikes();c_show();c_send();c_reply();c_full();c_style();c_load();c_media();c_form();var hash=window.location.hash.substr(1);if(hash=='yorum'){$('textarea[name=yorum]')[0].focus();$('html').addClass('fit-screen-comment').addClass('top-go-on');$('.c-send').addClass('fit-con').addClass('on');css_index('.wrap',true,9);$(window).scrollTop(0);}})
function c_form(reply){if(!comment.storge.open||comment.storge.open=='new'){$.get(set.page.url+'comment/form',function(htm){comment.form=htm;if(reply)c_reply_init(reply);})}}
function c_media(change){if(change){var key=set.win.x>set.media.sm?false:true;if(comment.mobil==false&&key==true){c_form_of_mobile();}
else{}}
else{comment.mobil=set.win.x>set.media.sm?false:true;}}
function c_storge(){localStorage.removeItem("comment");localStorage.setItem("comment",JSON.stringify(comment.storge));}
function c_load(reply){if(!comment.id){comment.id=$('.c-send.new input[name="src_id"]').val()}
if(localStorage.comment){var v=JSON.parse(localStorage.comment);if(set.user.login==false){if(v.isim){$('.c-send .field-isim input').val(v.isim);comment.storge.isim=v.isim}}
if(!reply&&comment.id&&v.yorum[comment.id]){$('.c-send.new textarea').val(v.yorum[comment.id]);comment.storge.yorum[comment.id]=v.yorum[comment.id]
if(set.win.x>set.media.sm){$('.c-send.new textarea').focus();}
else{$('.c-send.new').addClass('on more');}}
if(reply&&comment.replyid&&v.yorum[comment.replyid]){$('.c-send.reply textarea').val(v.yorum[comment.replyid]);}
comment.storge.open=v.open;if(v.open){if(v.open=='new'){$('.c-send.new textarea').focus();if(set.win.x>set.media.sm){var top=($('.c-send.new').offset().top-400);$(window).scrollTop(top);}
comment.storge.open=false;c_storge();}
else{var s=parseInt(v.open);comment.storge.yorum[s]=v.yorum[s];comment.storge.open=false;c_storge();c_form(s);}}}
$('.comment .c-login').on("click",function(e){comment.storge.open=comment.action=='new'?'new':comment.replyid;c_storge();});$('.btn-report.more input').on("click",function(e){$('.c-send.new textarea').focus();});$('.c-send .remove-comment').on("click",function(e){delete comment.storge.yorum[comment.id];$('.c-send.new').removeClass('more on');$('.c-send.new textarea').val('');c_storge();});}
function c_style(){var size=set.user.login?(set.win.y-175):(set.win.y-280);var css='<style>'+
'@media screen and (max-width: 48em){'+
'.c-send.on textarea { min-height:'+size+'px }'+
'}'+
'</style>';$('#code-css').append(css);}
function c_full(){$('.comment .c-size').click(function(){if(!$('html').hasClass('comment-full'))
{htmcss('comment-full',true);RemoveScroll(true);screen(true);}
else{htmcss('comment-full',false);RemoveScroll(false);screen(false);}})
$('.comment .c-size-close').click(function(){htmcss('comment-full',false);RemoveScroll(false);screen(false);})}
function c_reply_of(mobile){if(mobile){$('.comment article.reply-on .c-cevap a').text('Yanıtla').removeClass('on');}
$('.comment article .cp-rep').html('');$('.comment article').removeClass('reply-on');}
function c_reply_on(id){$('#C'+id).addClass('reply-on');$('#C'+id+' .cp-rep').html(comment.form);$('#C'+id+' form .field-replyid').attr('value',id);comment.replyid=id;c_load(true);c_reply_on_new();}
function c_reply_on_new(){$('.c-foot.us').addClass('hidden');if(!comment.storge.yorum[comment.id]){$('.c-send.new .cs-body > .sol').removeClass('hidden');$('.c-send.new').removeClass('on hata ok');}}
function c_reply(){$('.comment article .c-cevap a').click(function(){if(!$(this).hasClass('on'))
{$(this).text('Yanıttan Vazgeç').addClass('on');c_reply_of();c_reply_on($(this).data('id'));form_type();c_action();c_send();c_mobile();$('.c-send.reply textarea').focus();}
else{c_reply_of();$(this).text('Yanıtla').removeClass('on');}});}
function c_reply_init(id){$('#C'+id+' .c-cevap a').addClass('on').text('Yanıttan Vazgeç');c_reply_on(id);form_type();c_action();c_send();c_mobile();var e=$('.c-send.reply textarea');c_form_on(e);}
function c_show(){$('#c-show').click(function(){on_text=$(this).children('span').text();of_text=$(this).attr('data-mesaj');$(this).children('span').text(of_text);$(this).attr('data-mesaj',on_text);if(!$('.cb-post').hasClass('on'))
{$('.cb-post').addClass('on');if(set.lazy=='blazy'){bLazy.revalidate();}}
else
{$('.cb-post').removeClass('on');}});if(set.show_all_comments){$('#c-show').click();}}
function c_action(){$('.c-send textarea').focus(function(){c_form_on(this);});$('.c-send .field').focus(function(){$('.c-send').removeClass('hata');$('.c-send').removeClass('ok');var p=$('.field-'+$(this).attr('name'));if($(p).hasClass('hata')){$(p).addClass('edit');}});$('.c-send .field').blur(function(){var name=$(this).attr('name'),val=$(this).val(),id=false;id=comment.action=='new'?comment.id:comment.replyid;if(name=='yorum'){if(val!=''){comment.storge[name][id]=val}else{delete comment.storge[name][id]}}
if(name=='isim'){comment.storge[name]=(val!='')?val:false}
if(name=='mail'){comment.storge[name]=(val!='')?val:false}
c_storge();var p=$('.field-'+name);if($(p).hasClass('hata')){if(val==''){$(p).removeClass('edit');}}});}
function c_mobile(){$('.c-send-close').on("click",function(){c_form_of_mobile();})}
function c_form_on(field){clearTimeout(fs.refresh_time);olay=$(field).attr('data-olay');comment.action=olay;if(olay=='new')
{$('.c-send.new').addClass('on');$('.c-send.new').removeClass('more');c_form_on_mobile(true);$('.comment article.reply-on .c-cevap a').text('Yanıtla');$('.comment article').removeClass('reply-on');$('.comment article .cp-rep').html('');$('.c-foot.us, .c-foot.us .on').removeClass('hidden');}
if(olay=='reply')
{$('.cp-rep .c-foot, .cp-rep .c-foot .on').removeClass('hidden');$('.cp-rep .c-send.'+olay).addClass('on');c_form_on_mobile(true);}
$('.c-send.on .cs-body > .sol').addClass('hidden');autosize(field);$(document).keydown(function(c){if(c.keyCode==27){$(field).blur();}});}
function c_form_on_mobile(){if(set.win.x<(set.media.sm+1)){$('html').addClass('fit-screen-comment');css_index('.wrap',true,9);$(window).scrollTop(0);}}
function c_form_of_mobile(){if(set.win.x<(set.media.sm+1)){$('html').removeClass('fit-screen-comment');css_index('.wrap',false);var top=comment.action=="new"?(($('.c-send.new').offset().top)-100):(($('#C'+comment.replyid).offset().top)-100);$('.c-send.'+comment.action+' .cs-body > .sol').removeClass('hidden');if(comment.action=='new'){$('.c-send.new').removeClass('hata ok');$('.c-send.new form .hata').removeClass('hata');if(comment.storge.yorum[comment.id]){$('.c-send.new .cs-body > .sol').removeClass('hidden');$('.c-send.new').addClass('more');}
else{$('.c-send.new .cs-body > .sol').removeClass('hidden');$('.c-send.new').removeClass('on');}}
else{c_reply_of(true);}
$(window).scrollTop(top);}}
function form_c_before(){}
function c_send(){$('.comment form').submit(function(event){var olay=$(this).attr('name'),data=$(this).serializeArray(),hata=false,buton=$(this).find('input[type=submit]'),e={'form':$(this),'formcase':$('.c-send.'+olay),'robot':$('.c-send.'+olay+' .robot'),'errortext':$('.c-send.'+olay+' .report .no .text'),'olderrors':$('.c-send.'+olay+' .f1 .hata'),'field':{'yorum':$('.c-send.'+olay+' .field-yorum'),'isim':$('.c-send.'+olay+' .field-isim'),}};if(comment.robotOn){c_robot_of(e);}
$(e.formcase).removeClass('hata ok').addClass('load');$(buton).attr('disabled','disabled');data=showValues(data);data=data[0];hata=c_validate(data,e);if(hata){$(buton).removeAttr('disabled');$(e.formcase).addClass('hata').removeClass('load');}
else{var data=$(this).serializeArray();$.post(document.location,data,function(json){$(buton).removeAttr('disabled');if(json.result=='ok'){var id=comment.action=='new'?comment.id:comment.replyid;if(comment.storge.yorum[id]){delete comment.storge.yorum[id];c_storge();}
$(e.formcase).addClass('ok').removeClass('load');$('.c-send.on textarea').val('');comment.robotOn=false;if(set.user.login==false){grecaptcha.reset();}}
else{if(set.user.login==false){if(json.errors.robot){c_robot_on(e);}}
$(e.formcase).addClass('hata').removeClass('load');$(e.errortext).text(json.message);}})}
event.preventDefault();});}
function c_robot_on(e){$(e.robot).addClass('on');comment.robotOn=true;}
function c_robot_of(e){if(comment.robotOn){$(e.robot).addClass('of-before');window.setTimeout(function(){$(e.robot).removeClass('on of-before');},350);}}
function c_validate(data,e){snc=false;$(e.olderrors).removeClass('hata');if(data.yorum==''){snc=true;$(e.field.yorum).addClass('hata')}
if(!set.user.login)
{if(data.isim==''){$(e.field.isim).addClass('hata');snc=true}}
return snc;}
function c_reorders(orderBy){if(tmpCbPost!=null){$('.cb-post').html(tmpCbPost);tmpCbPost=null;}
var blocks=$('.cb-post > div').get();switch(orderBy){case 'lasttofirst':$('.cb-post').html('');blocks.sort(function(a,b){return $(a).data('order')>$(b).data('order');});$(blocks).each(function(index,val){$('.cb-post').append(val);});break;case 'firsttolast':$('.cb-post').html('');blocks.sort(function(a,b){return $(a).data('order')<$(b).data('order');});$(blocks).each(function(index,val){$('.cb-post').append(val);});break;case 'mostlikeds':$('.cb-post').html('');blocks.sort(function(a,b){return $(a).data('likes')<$(b).data('likes');});$(blocks).each(function(index,val){$('.cb-post').append(val);});$('.cb-post .subs').each(function(){var sub_block=$(this);var sub_posts=$(this).children('article').get();sub_posts.sort(function(a,b){return $(a).data('likes')<$(b).data('likes');});$(sub_posts).each(function(index,val){$(sub_block).append(val);});});break;}}
function c_likes(){$('.cb-post article').each(function(){var id=$(this).data('id');var key="comment-like-"+id;var like=localStorage.getItem(key);if(like){$(this).find('.c-begen i').attr('class','ss-gizmo ss-dislike');$(this).find('.c-begen a').text('Geri al');}})}
function c_dislikes(){$('.cb-post article').each(function(){var id=$(this).data('id');var key="comment-dislike-"+id;var like=localStorage.getItem(key);if(like){$(this).find('.c-begenme i').attr('class','ss-gizmo ss-dislike');$(this).find('.c-begenme a').text('Geri al');}})}
function c_like_toggle(element,commentId){var key="comment-like-"+commentId;var like=localStorage.getItem(key);var C=$('#C'+commentId);var likeSpan=$(C).data('likes')?C:$(C).parent();var totalLikes=$(likeSpan).data('likes');var em=$(C).find('.c-begen em');var dir=0;if(like){localStorage.removeItem(key);totalLikes-=1;$(element).text('Beğen');}else{localStorage.setItem(key,1);totalLikes+=1;$(element).text('İptal');dir=1;}
em.text(totalLikes);$(likeSpan).data('likes',totalLikes);var token=$('input[name=_token]').val();$.post('/service/commentlike',{id:commentId,dir:dir,_token:token},function(json){});}
function c_dislike_toggle(element,commentId){var key="comment-dislike-"+commentId;var dislike=localStorage.getItem(key);var C=$('#C'+commentId);var likeSpan=$(C).data('dislikes')?C:$(C).parent();var totalDislikes=$(likeSpan).data('dislikes');var em=$(C).find('.c-begenme em');var dir=0;if(dislike){localStorage.removeItem(key);totalDislikes-=1;$(element).text('Beğenme');}else{localStorage.setItem(key,1);totalDislikes+=1;$(element).text('İptal');dir=1;}
em.text(totalDislikes);$(likeSpan).data('dislikes',totalDislikes);var token=$('input[name=_token]').val();$.post('/service/commentdislike',{id:commentId,dir:dir,_token:token},function(json){});}