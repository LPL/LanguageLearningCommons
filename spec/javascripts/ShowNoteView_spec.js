describe("ShowNoteView", function() {
	describe("insertLineBreaks", function() {
		var shortDisplayText;
		var longDisplayText;
		var showNoteView = new ShowNoteView();

		beforeEach(function() {
			shortDisplayText = "This is short.";
			longDisplayText = "This text is so long it should be split.";
		});

		afterEach(function() {
			shortDisplayText = "This is short.";
			longDisplayText = "This text is so long it should be split.";
		});

		it("doesn't split displayText shorter then 25 characters", function(){
			expect(showNoteView.insertLineBreaks(shortDisplayText)).not.toMatch(/\n/);
		});

		it("splits displayText longer then 25 characters", function(){
			expect(showNoteView.insertLineBreaks(longDisplayText)).toMatch(/\n/);
		});

		it("only converts spaces into line breaks", function() {
			var brokenLongDisplayText = showNoteView.insertLineBreaks(longDisplayText);
			var unallowedDifferences = 0;
			_(longDisplayText).each(function(chr, index) {
				if(chr == brokenLongDisplayText[index]) {
				} else if(chr == " " && brokenLongDisplayText[index] == "\n") {
				} else {
					unallowedDifferences++;
				}
			});
			expect(unallowedDifferences).toBe(0);
		});
	});
});