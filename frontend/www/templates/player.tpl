<div class="player-header-background vjs-control-bar">
	<div class="player-title">Temp Title</div>
	<div class="details-player">
		<span class="close-info-player"></span>
		<div class="download-info-player">
			<div class="eye-info-player"></div>
			<div class="details-info-player">
				<div class="arrow-up"></div>
				<span class="speed-info-player"><%= i18n.__("Download") %>:&nbsp;</span><span class="download_speed_player">0 B/s</span><br>
				<span class="speed-info-player"><%= i18n.__("Upload") %>:&nbsp;</span><span class="upload_speed_player">0 B/s</span><br>
				<span class="speed-info-player"><%= i18n.__("Active Peers") %>:&nbsp;</span><span class="active_peers_player">0</span>
			</div>
		</div>
	</div>
</div>
<video id="video_player" width="100%" height="100%" class="video-js vjs-popcorn-skin" controls preload autoplay >
	<source src="<%= src %>" type="<%= type %>" />
</video>